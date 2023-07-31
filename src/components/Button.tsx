'use client'

interface ButtonProps {
  children: React.ReactNode
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  type?: 'primary' | 'secondary'
  className?: string
}

const Button = ({
  children,
  handleClick,
  type = 'primary',
  className,
}: ButtonProps) => {
  let buttonStyles = ''

  if (type === 'primary') {
    buttonStyles = 'bg-blue-400 text-white'
  }

  return (
    <button
      onClick={handleClick}
      className={`${className} ${buttonStyles} border p-1 px-4 rounded`}
    >
      {children}
    </button>
  )
}

export default Button
