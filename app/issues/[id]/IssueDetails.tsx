import { IssueStatusBadge } from "@/app/components"
import { Issues } from "@prisma/client"
import { Heading, Card, Text } from "@radix-ui/themes"
import ReactMarkdown from "react-markdown"


const IssuePageDetail = ({ issue } : { issue : Issues}) => {
    return (
        <>
                <Heading>{issue.title}</Heading>
                <div className='flex space-x-3 my-2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
                </div>

                <Card className="prose" mt="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
        </>
    )
}

export default IssuePageDetail;