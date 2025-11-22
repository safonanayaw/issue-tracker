'use client'

import { Button, TextArea, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import axios from 'axios';
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
//use dynamic import to render simplemde on csr as es7 simplemde use ssr import
const SimpleMDE = dynamic(()=> import("react-simplemde-editor"), {ssr: false});

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}


const newIssue = () => {
    const {register, handleSubmit, control} = useForm<IssueForm>();
    const router = useRouter();

 return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data)=> {
        await axios.post('/api/issues', data);

        router.push('/issues');

    })}>
        <TextField.Root placeholder='Title' {...register('title')}>
        </TextField.Root>
        <Controller 
        name='description'
        control = {control}
        render = {({ field })=> <SimpleMDE placeholder='Description' {...field}/>}
        />
        
        <Button>Submit New Issue</Button>
    </form>
 )
}
export default newIssue;