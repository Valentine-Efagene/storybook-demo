import styles from "./DetailCard.module.css";
import { DetailedHTMLProps, HTMLAttributes, useCallback, useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";
import FormatHelper from "@/lib/helpers/FormatHelper";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import TextLimit from "../TextLimit";
import type { Route } from "next";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string | null;
  value: string | undefined | null | number | boolean | Route;
  indicatorColor?: string;
  showIndicator?: boolean;
  underlined?: boolean;
  horizontal?: boolean;
  isLoading?: boolean
  show?: boolean
  canCopy?: boolean
  nChars?: number
  valueClassName?: string
  type?: 'tel' | 'email' | 'text' | 'NGN' | 'USD' | 'number' | 'url' | 'percentage' | 'date' | 'datetime' | 'boolean' | 'html' | 'text_cleaned'
}

export default function DetailCard(props: IProps) {
  const {
    label,
    value,
    canCopy,
    underlined = false,
    valueClassName,
    isLoading = false,
    horizontal = false,
    type = 'text',
    nChars,
    show = true,
    ...rest
  } = props;

  // Hooks must be called at the top level

  const malformed = useMemo(() => <span className="text-app-system-error">Malformed</span>, [])

  const resolvedValue = useMemo(() => {
    if (isLoading) {
      return 'Loading...'
    }

    if (value == null) {
      return 'N/A'
    }

    if ((type === 'text' || type == 'tel' || type == 'email' || type == 'url') && typeof value === 'string') {
      if (value?.trim()?.length < 1) {
        return 'N/A'
      }
    }

    switch (type) {
      case 'text':
        return value

      case 'tel':
        return <Link href={`tel:${value}`}>{value}</Link>

      case 'email':
        return <Link href={`mailto:${value}`}>{value}</Link>

      case 'url':
        return <Link href={value as any} target="_blank" rel="noopener noreferrer">{value}</Link>

      case 'boolean':
        return value ? 'Yes' : 'No'

      case 'NGN':
        if (isNaN(Number(value))) {
          return value
          // return malformed
        }

        return FormatHelper.nairaFormatter.format(Number(value))

      case 'USD':
        if (typeof value !== 'number') {
          return value
          //return malformed
        }

        return FormatHelper.dollarFormatter.format(value)

      case 'date':
        if (typeof value !== 'string') {
          return malformed
        }

        return FormatHelper.dateFormatter.format(value)

      case 'datetime':
        if (typeof value !== 'string') {
          return malformed
        }

        try {
          return FormatHelper.dateTimeFormatter.format(value)
        } catch (error) {
          return malformed
        }


      case 'percentage':
        if (typeof value !== 'number') {
          return malformed
        }

        return FormatHelper.percentageFormatter.format(value / 100)

      default:
        return value
    }
  }, [value, type, isLoading, malformed])

  const copyText = useMemo(() => {
    if (value == null) {
      return null
    }

    if (typeof value === 'string') {
      if (value.length < 1) {
        return null
      }

      return value
    }

    if (type === 'email') {
      return value
    }

    if (typeof value === 'number') {
      return `${value}`
    }

    return null
  }, [value, type])

  const handleCopy = useCallback(async () => {
    if (copyText == null) {
      toast.error("No value to copy")

      return
    }

    try {
      await navigator.clipboard.writeText(`${copyText}`);
      toast.success("Copied")
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error("Failed to copy text")
    }
  }, [copyText])

  if (!show) {
    return null
  }

  if (!show) {
    return null
  }

  return (
    <div
      {...rest}
      className={`${styles.container} ${props.className} ${underlined ? styles.underline : ""
        } ${horizontal ? styles.horizontal : ""}`}
    >
      <div className={clsx("flex gap-1 items-center", {
        'cursor-pointer': canCopy
      })} onClick={canCopy ? handleCopy : undefined}>
        <span className={styles.label}>{label}</span>
        {canCopy ? <Copy width={16} height={16} /> : null}
      </div>
      <div className={`${styles.bottom}`}>
        {nChars ? <TextLimit nChars={nChars} className={`${valueClassName} ${styles.value}`}>
          {resolvedValue}
        </TextLimit>
          : <span className={`${valueClassName} ${styles.value}`}>
            {resolvedValue}
          </span>
        }
      </div>
    </div>
  );
}
