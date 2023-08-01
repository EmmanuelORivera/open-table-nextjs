'use client'

interface ButtonProps {
  children: React.ReactNode
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  type?: 'primary' | 'secondary' | 'action'
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
    buttonStyles = 'bg-blue-500 hover:bg-blue-400 text-white'
  } else if (type === 'action') {
    buttonStyles =
      'bg-red-600 hover:bg-red-500 text-white uppercase p-3 disabled:bg-gray-400'
  } else {
    buttonStyles = 'hover:bg-gray-100'
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
