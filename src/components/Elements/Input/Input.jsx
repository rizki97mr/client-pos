const Input = (props) => {
    const { type, placeholder, name } = props
  return (
        <input
            type={type}
            className="text-sm border rounded w-full py-2 px-4 text-slate-700 opacity-50"
            placeholder={placeholder}
            name={name}
            id={name}
        />
  )
}

export default Input