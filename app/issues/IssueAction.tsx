import { Button } from "@radix-ui/themes"
import Link from "next/link"

const IssueActions = () => {
    return (
        <div>
        <Button className="mb-5">
        <Link href='/issues/new'> New Issue </Link>
        </Button>
        </div>
    )
}

export default IssueActions;