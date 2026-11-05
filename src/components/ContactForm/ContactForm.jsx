"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { InputCheckbox } from "@/modules/InputCheckbox";
import { InputText } from "@/modules/InputText";
import { InputTextarea } from "@/modules/InputTextarea";
import { InputSelect } from "@/modules/InputSelect";
import { InputLabel } from "@/modules/InputLabel";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { FormButton } from "@/modules/FormButton";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { SocialIcons } from "@/modules/SocialIcons";
import { cleanString } from "@/utils/helpers/string-helpers";

export const ContactForm = ({ data = {}, isSandbox = false }) => {
  const {
    formSpreeEndpoint,
    contactFields,
    title,
    body,
    socialIcons,
    anchorTagLink,
    onFormSubmitLink,
    sectionStyles = {},
    _key,
  } = data;
  const {
    backgroundColor,
    titleTextColor,
    bodyTextColor,
    topSpacing,
    bottomSpacing,
  } = sectionStyles;
  const ENDPOINT = cleanString(formSpreeEndpoint);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : pathname;

  const sanitizeFieldName = (label) => label.toLowerCase().replace(/\s+/g, "_");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
    setError,
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setSubmitting(true);

    const formData = new FormData();

    contactFields?.forEach((field) => {
      const value = data[sanitizeFieldName(field.label)];
      const displayValue =
        value === undefined || value === "" ? "[n/a]" : value;
      formData.append(field.label, displayValue);
    });

    formData.append("Submitted From Page", currentUrl);

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        handleSuccess();
      } else {
        const errorData = await response.json();
        console.error("Formspree error:", errorData);
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitting(false);
    }
  };

  const handleSuccess = () => {
    reset();
    setSubmitted(true);
    setSubmitting(false);
    if (onFormSubmitLink?.slug?.current) {
      router.push(onFormSubmitLink.slug.current);
    } else {
      alert("Thank you for your submission!");
    }
  };

  const renderFields = () => {
    return contactFields?.map((field, index) => {
      const fieldName = sanitizeFieldName(field.label);

      const getValidations = () => {
        const validations = {};

        if (field.isRequired) {
          validations.required = "Required";
        }

        if (field.fieldType === "email") {
          validations.pattern = {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Must be a valid email",
          };
        }

        if (field.fieldType === "phone") {
          validations.pattern = {
            value: /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/,
            message: "Must be a valid phone number",
          };
        }

        return validations;
      };

      const renderType = () => {
        switch (field.fieldType) {
          case "text":
          case "email":
          case "phone":
            return (
              <InputText
                register={register}
                name={fieldName}
                validations={getValidations()}
                label={field.label}
                currentValue={watch(fieldName)}
                error={errors?.[fieldName] ?? undefined}
                isPhoneField={field.fieldType === "phone"}
              />
            );

          case "textarea":
            return (
              <InputTextarea
                register={register}
                name={fieldName}
                validations={getValidations()}
                label={field.label}
                currentValue={watch(fieldName)}
                error={errors?.[fieldName] ?? undefined}
              />
            );

          case "dropdown":
            return (
              <InputSelect
                register={register}
                name={fieldName}
                validations={getValidations()}
                label={field.label}
                currentValue={watch(fieldName)}
                error={errors?.[fieldName] ?? undefined}
                options={
                  field.options?.map((opt) => ({ LABEL: opt, VALUE: opt })) ||
                  []
                }
                onChange={(value) => setValue(fieldName, value)}
                clearErrors={clearErrors}
                submitted={submitted}
              />
            );

          case "checkbox":
            return (
              <InputCheckbox
                register={register}
                name={fieldName}
                label={field.label}
                currentValue={watch(fieldName)}
                error={errors?.[fieldName] ?? undefined}
                options={
                  field.options?.map((opt) => ({ LABEL: opt, VALUE: opt })) ||
                  []
                }
                onChange={(value) => setValue(fieldName, value)}
                clearErrors={clearErrors}
                submitted={submitted}
              />
            );

          default:
            return null;
        }
      };

      return (
        <div key={field._key || index} className="mb-clamp-36">
          <InputLabel
            name={fieldName}
            label={field.label}
            validations={getValidations()}
            textColor={bodyTextColor}
            error={errors?.[fieldName] ?? undefined}
            id={
              field.type === "checkbox"
                ? `checkbox-group-${fieldName}`
                : undefined
            }
          />
          {renderType()}
        </div>
      );
    });
  };

  // ==================================================================== COMPONENT RETURN

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
    >
      <div className="contact_form_container flex flex-col md:max-w-150 md:m-auto lg:max-w-full lg:flex-row gap-clamp-40 lg:gap-clamp-60">
        <ScrollAnimation type="fade-right" className="w-full">
          <div className="contact_form_text_column flex flex-col w-full gap-clamp-30">
            <TextBlock
              title={title}
              body={body}
              sectionStyles={sectionStyles}
            />

            <SocialIcons data={socialIcons} color={titleTextColor} />
          </div>
        </ScrollAnimation>

        <div className="contact_form_form_column w-full md:min-w-115">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              // Prevent Enter key from submitting form unless on submit button
              if (e.key === "Enter" && e.target.type !== "submit") {
                e.preventDefault();
              }
            }}
          >
            <ScrollAnimation type="fade-in" stagger={0.1} className="w-full">
              {renderFields()}

              {!isSandbox && (
                <div className="contact_form_button_wrapper flex mt-clamp-60">
                  <FormButton
                    className="contact_form_button"
                    submitting={submitting}
                    errors={errors}
                    backgroundColor={titleTextColor}
                    textColor={backgroundColor}
                  >
                    Submit
                  </FormButton>
                </div>
              )}
            </ScrollAnimation>
          </form>
        </div>
      </div>
    </DefaultWrapper>
  );
};
