'use client'

import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import dynamic from 'next/dynamic';
// import SimpleMDE from "react-simplemde-editor";
import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillInfoCircle } from 'react-icons/ai';
import { z } from 'zod';
import { Issues } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';


type IssueFormData = z.infer<typeof issueSchema>;


const IssueForm = ({ issue } : { issue? : Issues }) => {
    const {register, handleSubmit, control, formState:{errors}} = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data)=> {
        try{
            if(issue)
                await axios.patch('/api/issues/' + issue.id, data)
            
            else{
                setSubmitting(true);
                await axios.post('/api/issues', data);
            }
            router.push('/issues');
            router.refresh();

        }catch(error){
            setSubmitting(false);
            setError("An unexpected error occured")
        }
        
    })

 return (
    <div className='max-w-xl'>

    {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Icon>
            <AiFillInfoCircle />
        </Callout.Icon>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller 
        name='description'
        defaultValue={issue?.description}
        control = {control}
        render = {({ field })=> <SimpleMDE placeholder='Description' {...field}/>}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        
        <Button disabled={isSubmitting}>{issue ? 'Update Issue' : 'Submit New Issue'}{' '}{isSubmitting && <Spinner />}</Button>
    </form>
</div>
 )
}
export default IssueForm;