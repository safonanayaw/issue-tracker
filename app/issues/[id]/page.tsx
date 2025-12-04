import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Grid, Heading, Text } from '@radix-ui/themes';
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from 'react-markdown';
import delay from 'delay';
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
    return (
            <Grid columns={{initial: "1", md: "2" }} gap="5">
            <Box>
            <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
            </Grid>
    )
}

export default IssuePageDetail;