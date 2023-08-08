import React from 'react'

interface Props {
  label: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ label, value, name, onChange }: Props) => {
  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        className="border rounded px-2 py-3 w-full"
      />
    </label>
  )
}

export default InputField
