const Title = ({ className, title }: { className?: string; title: string }) => {
  return (
    <div className={`${className} mt-4 border-b pb-6`}>
      <h1 className="font-bold text-4xl">{title}</h1>
    </div>
  )
}

export default Title
