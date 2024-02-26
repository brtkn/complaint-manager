'use client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'next-auth';
import Skeleton from '@/app/component/Skeleton';
import { Issue } from '@prisma/client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  const [assigneeField, setAssigneeField] = useState(
    issue.assignedToUserId || 'Unassigned'
  );

  const assignIssue = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId === 'Unassigned' ? null : userId,
      })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
    setAssigneeField(userId);
  };

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <>
      <Select.Root
        value={assigneeField}
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='Unassigned'>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
