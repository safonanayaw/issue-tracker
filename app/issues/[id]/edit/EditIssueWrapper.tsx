'use client'
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { Issues } from '@prisma/client';

const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {ssr: false,
        loading: ()=> <IssueFormSkeleton />
    } 
)

const EditIssueWrapper = ({ issue } : {issue : Issues}) => {

    return (
        <IssueForm issue={issue}/>
    )
}

export default EditIssueWrapper;