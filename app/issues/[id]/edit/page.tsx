import { prisma } from "@/prisma/client"
import { notFound } from "next/navigation";
import EditIssueWrapper from "./EditIssueWrapper";



const EditIssuePage = async ({ params } : { params : {id : string }}) => {
    const { id } = await params;
    const issue = await prisma.issues.findUnique({
        where : {id : parseInt(id)}
    });
    if(!issue) return notFound();

    return <EditIssueWrapper issue={issue}/>
}

export default EditIssuePage;