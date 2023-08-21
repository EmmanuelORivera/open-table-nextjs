import React from 'react'

interface Props {
  label?: string
  placeholder?: string
  type: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({
  label,
  placeholder,
  type,
  value,
  name,
  onChange,
}: Props) => {
  return (
    <label>
      {label || null}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="border rounded px-2 py-3 w-full"
      />
    </label>
  )
}

export default InputField
