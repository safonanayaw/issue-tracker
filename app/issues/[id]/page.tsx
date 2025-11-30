

import React from 'react';
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';

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
        <div>
            
            <Heading>{issue.title}</Heading>
            <div className='flex space-x-3'>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
            </div>

            <Card>{issue.description}</Card>
        </div>
    )
}

export default IssuePageDetail;