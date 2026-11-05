import type { StructureResolver } from "sanity/structure";
import { HomeIcon } from "@sanity/icons/Home";
import { CogIcon } from "@sanity/icons/Cog";
import { EditIcon } from "@sanity/icons/Edit";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { UsersIcon } from "@sanity/icons/Users";
import { TbLayoutNavbar, TbLayoutBottombar } from "react-icons/tb";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { GrDocumentMissing } from "react-icons/gr";
import { BiCookie } from "react-icons/bi";
import { FaDirections, FaLightbulb } from "react-icons/fa";
import { PiBreadFill } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Site Structure")
    .items([
      // ...S.documentTypeListItems().filter(
      //   (item) => item.getId() && !['post', 'category', 'author'].includes(item.getId()!),
      // ),

      S.listItem()
        .title("Home Page")
        .schemaType("homePage")
        .icon(HomeIcon)
        .child(
          S.editor()
            .title("Home Page")
            .schemaType("homePage")
            .documentId("homePage")
        ),

      S.listItem()
        .title("Pages")
        .schemaType("page")
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList("page")
            .title("Pages")
            .menuItems([
              S.orderingMenuItem({
                name: "dateCreated",
                title: "Created",
                by: [{ field: "_createdAt", direction: "desc" }],
              }),
              S.orderingMenuItem({
                name: "lastEdited",
                title: "Last Edited",
                by: [{ field: "_updatedAt", direction: "desc" }],
              }),
              S.orderingMenuItem({
                name: "navigationName",
                title: "Navigation Name",
                by: [{ field: "navigationName", direction: "asc" }],
              }),
              S.orderingMenuItem({
                name: "pageName",
                title: "Page Name",
                by: [{ field: "pageName", direction: "asc" }],
              }),
            ])
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType("page")
                .views([S.view.form().icon(EditIcon)])
            )
        ),

      //
      // BLOGS
      //
      S.divider(),
      S.divider(),

      S.listItem()
        .title("Posts")
        .schemaType("blogPost")
        .icon(FaLightbulb)
        .child(
          S.documentTypeList("blogPost")
            .title("Blog Posts")
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType("blogPost")
                .views([S.view.form().icon(EditIcon)])
            )
        ),

      //
      // EVENTS
      //
      S.divider(),
      S.divider(),

      S.listItem()
        .title("Events")
        .schemaType("event")
        .icon(BsFillCalendarEventFill)
        .child(
          S.documentTypeList("event")
            .title("Events")
            // Add default ordering by eventDateTime
            .defaultOrdering([{ field: "eventDateTime", direction: "desc" }])
            // Add order options that can be selected from the UI
            .menuItems([
              S.orderingMenuItem({
                name: "dateDesc", // <-- Add this
                title: "Date (descending)",
                by: [{ field: "eventDateTime", direction: "desc" }],
              }),
              S.orderingMenuItem({
                name: "dateAsc",
                title: "Date (ascending)",
                by: [{ field: "eventDateTime", direction: "asc" }],
              }),
              S.orderingMenuItem({
                name: "titleAsc",
                title: "Title (A-Z)",
                by: [{ field: "title", direction: "asc" }],
              }),
              S.orderingMenuItem({
                name: "lastEdited",
                title: "Last Edited",
                by: [{ field: "_updatedAt", direction: "desc" }],
              }),
            ])
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType("event")
                .views([S.view.form().icon(EditIcon)])
            )
        ),

      //
      // TEAM
      //
      S.divider(),
      S.divider(),

      S.listItem()
        .title("Team Members")
        .schemaType("teamMember")
        .icon(UsersIcon)
        .child(
          S.documentTypeList("teamMember")
            .title("Team Members")
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType("teamMember")
                .views([S.view.form().icon(EditIcon)])
            )
        ),

      //
      // NAVIGATION
      //
      S.divider(),
      S.divider(),

      S.listItem()
        .title("Header")
        .icon(TbLayoutNavbar)
        .child(S.document().schemaType("header").documentId("header")),

      S.listItem()
        .title("Footer")
        .icon(TbLayoutBottombar)
        .child(S.document().schemaType("footer").documentId("footer")),

      //
      // SITE SETTINGS
      //
      S.divider(),
      S.divider(),

      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Settings")
            .items([
              S.listItem()
                .title("404 Page")
                .icon(GrDocumentMissing)
                .child(
                  S.document()
                    .title("404 Page")
                    .schemaType("pageNotFound")
                    .documentId("pageNotFound")
                ),

              S.listItem()
                .title("Breadcrumbs")
                .icon(PiBreadFill)
                .child(
                  S.document()
                    .title("Breadcrumbs")
                    .schemaType("breadcrumbs")
                    .documentId("breadcrumbs")
                ),

              S.listItem()
                .title("Cookie Pop Up")
                .icon(BiCookie)
                .child(
                  S.document()
                    .title("Cookie Pop Up")
                    .schemaType("cookiePopUp")
                    .documentId("cookiePopUp")
                ),

              S.listItem()
                .title("Google Analytics & Tracking")
                .icon(FcGoogle)
                .child(
                  S.document()
                    .title("Google Analytics & Tracking")
                    .schemaType("googleAnalytics")
                    .documentId("googleAnalytics")
                ),

              S.listItem()
                .title("Google Translate")
                .icon(FcGoogle)
                .child(
                  S.document()
                    .title("Google Translate")
                    .schemaType("googleTranslate")
                    .documentId("googleTranslate")
                ),

              S.listItem()
                .title("Meta Settings (Global)")
                .icon(CogIcon)
                .child(
                  S.document()
                    .title("Meta Settings")
                    .schemaType("globalMetadata")
                    .documentId("globalMetadata")
                ),

              S.listItem()
                .title("URL Redirects")
                .icon(FaDirections)
                .child(
                  S.document()
                    .title("URL Redirects")
                    .schemaType("redirectsArray")
                    .documentId("redirectsArray")
                ),
            ])
        ),

      S.divider(),
    ]);
