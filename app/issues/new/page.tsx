'use client';
import ErrorMessage from '@/app/component/ErrorMessage';
import Spinner from '@/app/component/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
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
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
      setSubmitting(true);
    } catch (error) {
      setError('An unexpected error occurred.');
      setSubmitting(false);
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' mb='3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root mb='2'>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit Complaint {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
