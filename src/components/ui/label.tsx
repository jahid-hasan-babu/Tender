"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Define the variants for the label styles using CVA
const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// Define the Label component
const Label = React.forwardRef<
    HTMLLabelElement, // Ref type for HTMLLabelElement
    React.ComponentPropsWithoutRef<"label"> & VariantProps<typeof labelVariants> // Component props type
>(({ className, ...props }, ref) => (
    <label
        ref={ref} // Attach the ref to the label element
        className={cn(labelVariants(), className)} // Apply the class variants and custom class
        {...props} // Spread any other props to the label
    />
))

Label.displayName = "Label" // Set the display name for debugging purposes

export { Label }
