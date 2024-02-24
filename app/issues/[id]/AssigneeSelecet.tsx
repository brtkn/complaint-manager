'use client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'next-auth';
import Skeleton from '@/app/component/Skeleton';
const AssigneeSelecet = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelecet;
