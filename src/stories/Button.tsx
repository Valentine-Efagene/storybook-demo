// This file is deprecated. Please use the Button component from @/components/ui/button instead.
// This is kept for reference and backward compatibility with existing stories.

import './button.css';

export interface LegacyButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** 
 * @deprecated Use Button from @/components/ui/button instead
 * Legacy Storybook Button component 
 */
export const LegacyButton = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: LegacyButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
