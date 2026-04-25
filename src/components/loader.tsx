import { LoaderCircle } from "lucide-react"


const Loader = ({ item }: { item: string }) => {
  return (
    <div className="flex gap-1 items-center h-screen justify-center">
        <LoaderCircle className="animate-spin" size={20} />
        <p>Loading {item}...</p>
    </div>
  )
}

export default Loader