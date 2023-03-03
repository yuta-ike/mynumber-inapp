import classNames from "classnames"
import React from "react"

export type AiLoadingProps = {
  className?: string
}

const AiLoading: React.FC<AiLoadingProps> = ({ className }) => {
  return (
    <div className={classNames("flex space-x-2", className)}>
      <div
        className="h-2 w-2 animate-thinking rounded-full bg-primary delay-100"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="h-2 w-2 animate-thinking rounded-full bg-primary delay-300"
        style={{ animationDelay: "430ms" }}
      />
      <div
        className="h-2 w-2 animate-thinking rounded-full bg-primary delay-500"
        style={{ animationDelay: "740ms" }}
      />
    </div>
  )
}

export default AiLoading
