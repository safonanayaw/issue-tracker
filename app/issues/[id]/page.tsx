
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';
import delay from 'delay';

interface Props {
    params: {id: string}
}

const IssuePageDetail = async ({params} : Props) => {
    const { id } = await params;
    const issue = await prisma.issues.findUnique({
        where: {id: parseInt(id)}
    });
    if(!issue)
        notFound();
    await delay(2000)
    return (
        <div>
            
            <Heading>{issue.title}</Heading>
            <div className='flex space my-2'>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
            </div>

            <Card className="prose" mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssuePageDetail;