'use client'

import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import axios from 'axios';
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
//use dynamic import to render simplemde on csr as es7 simplemde use ssr import
const SimpleMDE = dynamic(()=> import("react-simplemde-editor"), {ssr: false});

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import { ClientPageRoot } from 'next/dist/client/components/client-page';


type IssueForm = z.infer<typeof createIssueSchema>;

const newIssue = () => {
    const {register, handleSubmit, control, formState : {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();
    const [error, setError] = useState('');

 return (
    <div className='max-w-xl'>

    {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Icon>
            <AiFillInfoCircle />
        </Callout.Icon>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form className='space-y-3' onSubmit={handleSubmit(async (data)=> {
        try{
            await axios.post('/api/issues', data);
            router.push('/issues');
        }catch(error){
            setError("An unexpected error occured")
        }
        
    })}>
        <TextField.Root placeholder='Title' {...register('title')}>
        </TextField.Root>
        { errors.title && <Text as='p' color='red'>{errors.title.message}</Text>}
        <Controller 
        name='description'
        control = {control}
        render = {({ field })=> <SimpleMDE placeholder='Description' {...field}/>}
        />
        {errors.description && <Text as='p' color='red'>{errors.description.message}</Text>}
        
        <Button>Submit New Issue</Button>
    </form>
</div>
 )
}
export default newIssue;