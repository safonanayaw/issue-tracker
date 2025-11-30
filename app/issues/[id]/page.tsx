import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Grid, Heading, Text } from '@radix-ui/themes';
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from 'react-markdown';
import delay from 'delay';
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";

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
            <Grid columns={{initial: "1", md: "2" }} gap="5">
            <Box>
                <Heading>{issue.title}</Heading>
                <div className='flex space-x-3 my-2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
                </div>

                <Card className="prose" mt="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>                    
                        Edit Issue
                    </Link>
                </Button>
            </Box>
            </Grid>
    )
}

export default IssuePageDetail;