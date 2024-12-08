import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
    useFormContext,
} from 'react-hook-form'

import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Label } from '../Label'
import { cn } from '@/utils/helper'

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName
}

type FormTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
    headingLevel: 1 | 2
    title: string
}

type HeadingVariants = `h${1 | 2 | 3 | 4 | 5 | 6}`

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>')
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const id = React.useId()

        return (
            <FormItemContext.Provider value={{ id }}>
                <div ref={ref} className={cn('space-y-2', className)} {...props} />
            </FormItemContext.Provider>
        )
    },
)
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
        <Label
            ref={ref}
            className={cn(error && 'text-destructive', className)}
            htmlFor={formItemId}
            {...props}
        />
    )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    )
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn('text-[0.8rem] text-muted-foreground', className)}
            {...props}
        />
    )
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { pathname } = useLocation()
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children
    const { t } = useTranslation(['sign-in'])
    if (!body) {
        return null
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn('text-base text-destructive', className)}
            {...props}
        >
            {pathname.startsWith('/crew') || pathname.startsWith('/reset-password')
                ? t(`${body}`)
                : body}
        </p>
    )
})
FormMessage.displayName = 'FormMessage'

const FormTitle = React.forwardRef<HTMLHeadingElement, FormTitleProps>(
    ({ className, headingLevel, title, ...props }, ref) => {
        const HeadingTag: HeadingVariants = `h${headingLevel}`

        return (
            <HeadingTag ref={ref} className={cn('text-base', className)} {...props}>
                {title}
            </HeadingTag>
        )
    },
)
FormTitle.displayName = 'FormTitle'

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormTitle,
    FormField,
}
