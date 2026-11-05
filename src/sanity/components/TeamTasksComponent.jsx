import { useState, useEffect, useRef } from "react";
import {
  Card,
  Container,
  Flex,
  Stack,
  Text,
  TextInput,
  TextArea,
  Button,
  Box,
  Badge,
  Spinner,
} from "@sanity/ui";
import { MenuButton, Menu, MenuItem } from "@sanity/ui/menu";
import { TrashIcon } from "@sanity/icons/Trash";
import { AddIcon } from "@sanity/icons/Add";
import { EditIcon } from "@sanity/icons/Edit";
import { SyncIcon } from "@sanity/icons/Sync";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { EllipsisHorizontalIcon } from "@sanity/icons/EllipsisHorizontal";
import { ChevronDownIcon } from "@sanity/icons/ChevronDown";
import { useClient, useCurrentUser } from "sanity";

const NOTES_DOC_ID = "teamNotes"; // Fixed document ID for our single notes document

// ================================================== FORMAT DATE
const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString();
};

// ================================================== FORMAT DESCRIPTION
const formatDescription = (text) => {
  if (!text) return null;

  return text.split("\n").map((line, i) => {
    // Handle bullet points (lines starting with - or *)
    if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
      const content = line.trim().substring(1).trim();
      return (
        <div key={i} style={{ display: "flex", marginBottom: "4px" }}>
          <span style={{ marginRight: "8px" }}>•</span>
          <span
            dangerouslySetInnerHTML={{ __html: formatInlineStyles(content) }}
          />
        </div>
      );
    }

    // Regular lines
    return (
      <div key={i} style={{ marginBottom: line.trim() ? "4px" : "8px" }}>
        <span dangerouslySetInnerHTML={{ __html: formatInlineStyles(line) }} />
      </div>
    );
  });
};

// Format bold (**text**), italic (*text*), and links ([text](url))
const formatInlineStyles = (text) => {
  return text
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline;">$1</a>'
    ) // Links
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>"); // Italic (not part of **)
};

// ================================================== MAIN COMPONENT
const TeamTasksComponent = () => {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    status: "waiting",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notesOriginal, setNotesOriginal] = useState("");
  const [hasUnsavedNotes, setHasUnsavedNotes] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (showAddForm) {
      // wait for Sanity UI input to mount
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 10);
    }
  }, [showAddForm]);

  // ================================================== IS OVERDUE FUNCTION
  const getTaskDateStatus = (task) => {
    if (!task.dueDate || task.completed)
      return { isOverdue: false, isDueToday: false };

    // Parse the date string (YYYY-MM-DD format from Sanity)
    const [year, month, day] = task.dueDate.split("-").map(Number);
    const dueDate = new Date(year, month - 1, day);
    const today = new Date();

    // Set both to midnight for fair comparison
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const isDueToday = dueDate.getTime() === today.getTime();
    const isOverdue = dueDate.getTime() < today.getTime();

    return { isOverdue, isDueToday };
  };

  // ================================================== SANITY CLIENT
  const client = useClient({ apiVersion: "2025-10-03" });
  const currentUser = useCurrentUser();

  // ================================================== FETCH DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      // Fetch all tasks and sort by:
      // 1. Completed status (incomplete first)
      // 2. Has due date (with due dates first)
      // 3. Due date (earliest first)
      // 4. Creation date (newest first)
      const tasksData = await client.fetch(`
      *[_type == "teamTask"] | order(
        completed asc, 
        defined(dueDate) desc, 
        dueDate asc, 
        createdAt asc
      )
    `);
      setTasks(tasksData);

      // Fetch notes (there's just one document)
      const notesData = await client.fetch(
        `*[_type == "teamNotes" && _id == $id][0]`,
        { id: NOTES_DOC_ID }
      );

      if (notesData) {
        setNotes(notesData.notes || "");
        setNotesOriginal(notesData.notes || ""); // Store original for comparison
        setHasUnsavedNotes(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================================================== REALTIME UPDATES
  // Setup a listener for realtime updates
  useEffect(() => {
    let subscription;

    const setupSubscription = () => {
      try {
        subscription = client
          .listen(`*[_type in ["teamTask", "teamNotes"]]`)
          .subscribe({
            next: (update) => {
              // Only fetch if it's not a mutation we initiated
              if (!saving) {
                fetchData();
              }
            },
            error: (err) => {
              console.error("Subscription error:", err);
              // Try to reconnect after a short delay
              setTimeout(setupSubscription, 3000);
            },
          });
      } catch (err) {
        console.error("Error setting up subscription:", err);
        setTimeout(setupSubscription, 3000);
      }
    };

    setupSubscription();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [saving]);

  // ================================================== NOTES HANDLERS
  const saveNotes = async () => {
    if (notes === notesOriginal) return; // No changes to save

    setSaving(true);
    try {
      await client.createOrReplace({
        _id: NOTES_DOC_ID,
        _type: "teamNotes",
        notes: notes,
        lastUpdatedBy: currentUser?.name || "Unknown user",
        lastUpdatedAt: new Date().toISOString(),
      });
      setNotesOriginal(notes); // Update original after successful save
      setHasUnsavedNotes(false);
    } catch (error) {
      console.error("Error saving notes:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleNotesChange = (e) => {
    const newValue = e.target.value;
    setNotes(newValue);
    setHasUnsavedNotes(newValue !== notesOriginal);
  };

  // ================================================== TASK HANDLERS
  // ========================================= ADD TASK
  const addTask = async () => {
    if (!newTask.title.trim()) return;

    setSaving(true);
    try {
      const task = {
        _type: "teamTask",
        title: newTask.title,
        description: newTask.description,
        assignee: newTask.assignee,
        dueDate: newTask.dueDate || undefined,
        completed: false,
        status: "waiting",
        createdAt: new Date().toISOString(),
        createdBy: currentUser?.name || "Unknown user",
      };

      // Step 1: Create optimistic update
      const tempId = `temp-${Date.now()}`;
      const tempTask = { ...task, _id: tempId };
      setTasks((current) => [tempTask, ...current]);

      // Step 2: Reset form state
      setNewTask({
        title: "",
        description: "",
        assignee: "",
        dueDate: "",
        status: "waiting",
      });
      setShowAddForm(false);

      // Step 3: Create in database
      await client.create(task);

      // Step 4: Explicitly refresh data to ensure proper sorting
      await fetchData();
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setSaving(false);
    }
  };

  // ================================================= UPDATE TASK STATUS
  const updateTaskStatus = async (task, newStatus) => {
    setSaving(true);

    // Step 1: Optimistic update - immediately update the UI
    const isCompleting = newStatus === "complete";
    setTasks(
      tasks.map((t) =>
        t._id === task._id
          ? { ...t, status: newStatus, completed: isCompleting }
          : t
      )
    );

    try {
      // Step 2: Send update to server
      await client
        .patch(task._id)
        .set({ status: newStatus, completed: isCompleting })
        .commit();

      // Step 3: Force refresh to ensure consistency
      fetchData();
    } catch (error) {
      console.error("Error updating task status:", error);

      // Step 4: Revert optimistic update if there was an error
      setTasks(
        tasks.map((t) =>
          t._id === task._id
            ? { ...t, status: task.status, completed: task.completed }
            : t
        )
      );
    } finally {
      setSaving(false);
    }
  };

  // ================================================= DELETE TASK
  const deleteTask = async (id) => {
    setSaving(true);

    // Step 1: Optimistic update - immediately remove the task from UI
    const originalTasks = [...tasks];
    setTasks(tasks.filter((task) => task._id !== id));

    try {
      // Step 2: Delete from database
      await client.delete(id);

      // Step 3: Force refresh to ensure consistency
      await fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);

      // Step 4: Revert optimistic update if there was an error
      setTasks(originalTasks);
    } finally {
      setSaving(false);
    }
  };

  // ================================================= SAVE EDITED TASK
  const saveEditedTask = async () => {
    if (!editingTask?.title?.trim()) return;

    setSaving(true);
    try {
      // Step 1: Apply optimistic update
      const updatedTasks = tasks.map((t) =>
        t._id === editingTask._id ? editingTask : t
      );
      setTasks(updatedTasks);

      // Step 2: Reset edit mode
      setEditingTask(null);

      // Step 3: Update in database
      const patch = client.patch(editingTask._id).set({
        title: editingTask.title,
        description: editingTask.description,
        assignee: editingTask.assignee,
      });

      // Handle dueDate - either set it or unset it
      if (editingTask.dueDate && editingTask.dueDate.trim() !== "") {
        patch.set({ dueDate: editingTask.dueDate });
      } else {
        patch.unset(["dueDate"]);
      }

      await patch.commit();

      // Step 4: Explicitly refresh data
      await fetchData();
    } catch (error) {
      console.error("Error editing task:", error);
    } finally {
      setSaving(false);
    }
  };

  // ======================================================================
  // RENDER
  // ======================================================================
  return (
    <Container width={3} style={{ padding: "30px 10px" }}>
      <Stack gap={4}>
        {/* ========================================== Header */}
        <Box>
          <Flex align="center" gap={3}>
            <Text size={4} weight="bold">
              Tasks
            </Text>
            {saving && (
              <Flex align="center" gap={2}>
                <Spinner />
                <Text size={1}>Saving...</Text>
              </Flex>
            )}
          </Flex>
          <Text size={1} muted style={{ marginTop: "0.5rem" }}>
            Task management for you and your team
          </Text>
        </Box>

        {/* ============================================ Add New Task */}
        {!showAddForm ? (
          <Button
            tone="primary"
            icon={AddIcon}
            text="Add Task"
            onClick={() => setShowAddForm(true)}
            padding={3}
            style={{ width: 140, marginTop: 10 }}
            disabled={saving}
          />
        ) : (
          <Card padding={4} border>
            {/* ======================================== Add New Task Form */}
            <Stack gap={2}>
              <Text size={3} weight="semibold" style={{ marginBottom: 10 }}>
                Add New Task
              </Text>
              <Text size={1} weight="semibold">
                Title *
              </Text>
              <TextInput
                ref={titleInputRef}
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                disabled={saving}
              />
              <Text size={1} weight="semibold" style={{ marginTop: 10 }}>
                Description (Optional)
              </Text>
              <Text size={1} muted style={{ marginTop: 4, marginBottom: 8 }}>
                Supports **bold**, *italic*, bullets with -, and [link
                text](url)
              </Text>
              <TextArea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                rows={4}
                disabled={saving}
              />
              <Text size={1} weight="semibold" style={{ marginTop: 10 }}>
                Assignee (Optional)
              </Text>
              <TextInput
                value={newTask.assignee}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignee: e.target.value })
                }
                disabled={saving}
              />
              <Text size={1} weight="semibold" style={{ marginTop: 10 }}>
                Due Date (Optional)
              </Text>
              <Flex align="center" gap={2}>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  disabled={saving}
                  style={{
                    width: "140px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
                {newTask.dueDate && (
                  <Button
                    icon={TrashIcon}
                    mode="ghost"
                    padding={2}
                    fontSize={1}
                    onClick={() => setNewTask({ ...newTask, dueDate: "" })}
                    title="Clear date"
                    disabled={saving}
                  />
                )}
              </Flex>
              <Flex gap={2} paddingTop={3}>
                <Button
                  tone="primary"
                  text="Save"
                  onClick={addTask}
                  disabled={!newTask.title.trim() || saving}
                />
                <Button
                  mode="ghost"
                  text="Cancel"
                  onClick={() => setShowAddForm(false)}
                  disabled={saving}
                />
              </Flex>
            </Stack>
          </Card>
        )}

        {/* ======================================================== Task List */}
        <Card paddingTop={4}>
          <Stack gap={3}>
            <Flex align="center" justify="space-between">
              <Text size={3} weight="semibold">
                Task List
              </Text>
              <Badge padding={2}>{`${tasks.length} items`}</Badge>
            </Flex>

            {loading ? (
              <Flex justify="center" padding={5}>
                <Spinner />
              </Flex>
            ) : tasks.length === 0 ? (
              <Box padding={4} style={{ textAlign: "center" }}>
                <Text muted>No tasks yet. Add one above to get started!</Text>
              </Box>
            ) : (
              <Stack gap={2}>
                {/* ================================================ Task Item Map */}
                {tasks.map((task) => {
                  const { isOverdue, isDueToday } = getTaskDateStatus(task);
                  return (
                    <Card
                      key={task._id}
                      paddingLeft={4}
                      paddingRight={3}
                      paddingY={3}
                      border
                      tone={
                        isOverdue
                          ? "critical"
                          : isDueToday
                            ? "caution"
                            : task.completed
                              ? "transparent"
                              : "default"
                      }
                    >
                      {/* ========================================== Edit Task Form */}
                      {editingTask && editingTask._id === task._id ? (
                        <Stack gap={3}>
                          <Text size={1} weight="semibold">
                            Title *
                          </Text>
                          <TextInput
                            value={editingTask.title}
                            onChange={(e) =>
                              setEditingTask({
                                ...editingTask,
                                title: e.target.value,
                              })
                            }
                            disabled={saving}
                          />
                          <Text size={1} weight="semibold">
                            Description (optional)
                          </Text>
                          <Text
                            size={1}
                            muted
                            style={{ marginTop: 4, marginBottom: 8 }}
                          >
                            Supports **bold**, *italic*, bullets with -, and
                            [link text](url)
                          </Text>
                          <TextArea
                            value={editingTask.description || ""}
                            onChange={(e) =>
                              setEditingTask({
                                ...editingTask,
                                description: e.target.value,
                              })
                            }
                            rows={4}
                            disabled={saving}
                          />
                          <Text size={1} weight="semibold">
                            Assignee (optional)
                          </Text>
                          <TextInput
                            value={editingTask.assignee || ""}
                            onChange={(e) =>
                              setEditingTask({
                                ...editingTask,
                                assignee: e.target.value,
                              })
                            }
                            disabled={saving}
                          />

                          <Text size={1} weight="semibold">
                            Due Date (Optional)
                          </Text>
                          <Flex align="center" gap={2}>
                            <input
                              type="date"
                              value={editingTask.dueDate || ""}
                              onChange={(e) =>
                                setEditingTask({
                                  ...editingTask,
                                  dueDate: e.target.value,
                                })
                              }
                              disabled={saving}
                              style={{
                                width: "140px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "14px",
                              }}
                            />
                            {editingTask.dueDate && (
                              <Button
                                icon={TrashIcon}
                                mode="ghost"
                                padding={2}
                                fontSize={1}
                                onClick={() =>
                                  setEditingTask({
                                    ...editingTask,
                                    dueDate: "",
                                  })
                                }
                                title="Clear date"
                                disabled={saving}
                              />
                            )}
                          </Flex>

                          <Flex gap={2}>
                            <Button
                              tone="primary"
                              text="Save"
                              onClick={saveEditedTask}
                              disabled={!editingTask.title.trim() || saving}
                            />
                            <Button
                              mode="ghost"
                              text="Cancel"
                              onClick={() => setEditingTask(null)}
                              disabled={saving}
                            />
                          </Flex>
                        </Stack>
                      ) : (
                        // ============================================= DISPLAY TO DO
                        <Stack>
                          {(isOverdue || isDueToday) && (
                            <Badge
                              size={1}
                              padding={2}
                              radius={2}
                              tone={isOverdue ? "critical" : "caution"}
                              style={{ width: "fit-content", marginBottom: 8 }}
                            >
                              <CalendarIcon style={{ marginRight: 4 }} />
                              {isOverdue ? "Overdue" : "Due Today"}
                            </Badge>
                          )}
                          <Flex direction={"row"} justify={"space-between"}>
                            <Stack gap={4} style={{ width: "100%" }}>
                              <Flex
                                align={"center"}
                                justify={"space-between"}
                                style={{ gap: 10, width: "100%" }}
                                wrap={"wrap"}
                              >
                                <Text
                                  size={3}
                                  weight="medium"
                                  style={{
                                    flex: 1,
                                    opacity: task.completed ? 0.6 : 1,
                                    transition: "opacity 0.2s ease",
                                    marginRight: 20,
                                    minWidth: 300,
                                  }}
                                >
                                  {task.title}
                                </Text>

                                <Flex align="center" gap={2}>
                                  {/* Status Menu Button */}
                                  <MenuButton
                                    button={
                                      <Button
                                        text={
                                          task.status === "inProgress"
                                            ? "In Progress"
                                            : task.status === "blocked"
                                              ? "Blocked"
                                              : task.status === "complete"
                                                ? "Complete"
                                                : "Waiting"
                                        }
                                        tone={
                                          (task.status || "waiting") ===
                                          "waiting"
                                            ? "default"
                                            : task.status === "inProgress"
                                              ? "primary"
                                              : task.status === "blocked"
                                                ? "critical"
                                                : "positive"
                                        }
                                        mode="ghost"
                                        padding={2}
                                        fontSize={1}
                                        disabled={saving}
                                        style={{
                                          cursor: "pointer",
                                          width: 120,
                                          border:
                                            (task.status || "waiting") ===
                                            "waiting"
                                              ? "2px solid #666"
                                              : task.status === "inProgress"
                                                ? "2px solid #3b82f6"
                                                : task.status === "blocked"
                                                  ? "2px solid #ef4444"
                                                  : "2px solid #22c55e",
                                        }}
                                        iconRight={ChevronDownIcon}
                                      />
                                    }
                                    id={`status-menu-${task._id}`}
                                    popover={{ placement: "bottom-end" }}
                                    menu={
                                      <Menu
                                        style={{
                                          width: 120,
                                        }}
                                      >
                                        <MenuItem
                                          text="Waiting"
                                          onClick={() =>
                                            updateTaskStatus(task, "waiting")
                                          }
                                          disabled={saving}
                                          tone={"default"}
                                        />
                                        <MenuItem
                                          text="In Progress"
                                          onClick={() =>
                                            updateTaskStatus(task, "inProgress")
                                          }
                                          disabled={saving}
                                          tone={"primary"}
                                        />
                                        <MenuItem
                                          text="Blocked"
                                          onClick={() =>
                                            updateTaskStatus(task, "blocked")
                                          }
                                          disabled={saving}
                                          tone={"critical"}
                                        />
                                        <MenuItem
                                          text="Complete"
                                          onClick={() =>
                                            updateTaskStatus(task, "complete")
                                          }
                                          disabled={saving}
                                          tone={"positive"}
                                        />
                                      </Menu>
                                    }
                                  />
                                </Flex>
                              </Flex>
                              <Stack
                                gap={2}
                                style={{
                                  opacity: task.completed ? 0.6 : 1,
                                  transition: "opacity 0.2s ease",
                                  paddingLeft: 0,
                                  width: "85%",
                                  minWidth: 300,
                                }}
                              >
                                {task.description && (
                                  <Flex direction={"column"} justify={"center"}>
                                    <Text size={2} weight="semibold" as="span">
                                      Description:
                                    </Text>
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        marginTop: 16,
                                        marginBottom: 10,
                                        lineHeight: "1.5",
                                      }}
                                    >
                                      {formatDescription(task.description)}
                                    </div>
                                  </Flex>
                                )}
                              </Stack>
                            </Stack>
                          </Flex>
                          <Flex
                            justify="space-between"
                            align="flex-end"
                            style={{ marginLeft: 0 }}
                            paddingTop={3}
                          >
                            <Stack gap={2}>
                              <Flex align="center">
                                <Text
                                  size={2}
                                  weight="semibold"
                                  as="span"
                                  style={{ width: 100 }}
                                >
                                  Assigned to:{" "}
                                </Text>
                                <Badge
                                  tone={task.assignee ? "primary" : "default"}
                                  padding={2}
                                  fontSize={2}
                                  radius={2}
                                >
                                  {task.assignee ? task.assignee : "Unassigned"}
                                </Badge>
                              </Flex>

                              {task.dueDate && (
                                <Flex align="center">
                                  <Text
                                    size={2}
                                    weight="semibold"
                                    as="span"
                                    style={{ width: 100 }}
                                  >
                                    Date Due:{" "}
                                  </Text>
                                  <Badge
                                    tone={
                                      isOverdue
                                        ? "critical"
                                        : isDueToday
                                          ? "caution"
                                          : "default"
                                    }
                                    padding={2}
                                    fontSize={2}
                                    radius={2}
                                  >
                                    {formatDate(task.dueDate)}
                                  </Badge>
                                </Flex>
                              )}

                              <Text muted={!(isOverdue || isDueToday)} size={1}>
                                Added on{" "}
                                {new Date(task.createdAt).toLocaleDateString()}{" "}
                                by {task.createdBy}
                              </Text>
                            </Stack>

                            <Flex gap={2} justify="flex-end">
                              <MenuButton
                                button={
                                  <Button
                                    mode="ghost"
                                    icon={EllipsisHorizontalIcon}
                                    padding={3}
                                    style={{ cursor: "pointer" }}
                                    title="Task actions"
                                  />
                                }
                                id={`menu-${task._id}`}
                                popover={{ placement: "left-end" }}
                                menu={
                                  <Menu>
                                    <MenuItem
                                      text="Delete"
                                      icon={TrashIcon}
                                      tone="critical"
                                      onClick={() => deleteTask(task._id)}
                                      disabled={saving}
                                    />
                                    <MenuItem
                                      text="Edit"
                                      icon={EditIcon}
                                      onClick={() =>
                                        setEditingTask({ ...task })
                                      }
                                      disabled={saving}
                                    />
                                  </Menu>
                                }
                              />
                            </Flex>
                          </Flex>
                        </Stack>
                      )}
                    </Card>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Card>

        {/* =============================================== Notes Area */}
        <Card paddingTop={6} paddingBottom={6}>
          <Stack gap={3} style={{ position: "relative" }}>
            <Flex justify="space-between" align="center">
              <Text size={3} weight="semibold">
                Notes
              </Text>

              <Flex align="center" gap={3}>
                {hasUnsavedNotes && !saving && (
                  <Badge fontSize={2} padding={1} radius={2} tone="caution">
                    You have unsaved changes
                  </Badge>
                )}
                <Button
                  tone="primary"
                  text={saving ? "Saving..." : "Save Notes"}
                  onClick={saveNotes}
                  disabled={!hasUnsavedNotes || saving || loading}
                  padding={3}
                />
              </Flex>
            </Flex>
            <TextArea
              placeholder="Jot down a note..."
              value={notes}
              onChange={handleNotesChange}
              rows={12}
              style={{ fontSize: "16px", lineHeight: "1.5", padding: 14 }}
              disabled={loading || saving}
            />

            <Flex
              align="center"
              justify={"flex-end"}
              style={{ position: "absolute", top: "103%", right: 0 }}
            >
              {hasUnsavedNotes && !saving && (
                <Badge fontSize={2} padding={1} radius={2} tone="caution">
                  Navigating away from this page will discard any unsaved notes
                </Badge>
              )}
            </Flex>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default TeamTasksComponent;
