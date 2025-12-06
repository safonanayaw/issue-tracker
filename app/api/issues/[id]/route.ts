import { issueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params } : { params: { id: string } }){
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    const { id } = await params;
    const issue = await prisma.issues.findUnique({
        where: { id : parseInt(id)}
    });

    if(!issue)
       return NextResponse.json( { error: "Issue not Found"}, { status : 404});

    const updatedIssue = await prisma.issues.update({
        where: { id: issue.id},
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue);
}