'use client';
import { Button, Callout, TextArea, TextField, Text } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' mb='3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occurred.');
          }
        })}
      >
        <TextField.Root mb='2'>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        {errors.title && (
          <Text as='p' color='red'>
            {errors.title.message}
          </Text>
        )}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />
        {errors.description && (
          <Text as='p' color='red'>
            {errors.description.message}
          </Text>
        )}
        <Button>Submit Complaint</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
