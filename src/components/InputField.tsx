import React from 'react'

interface Props {
  label: string
  type: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ label, type, value, name, onChange }: Props) => {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="border rounded px-2 py-3 w-full"
      />
    </label>
  )
}

export default InputField
