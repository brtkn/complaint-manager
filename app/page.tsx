import { IssueQuery } from './issues/list/IssueTable';
import IssuesPage from './issues/list/page';

interface Props {
  searchParams: IssueQuery;
}

export default function Home({ searchParams }: Props) {
  return (
    <>
      <IssuesPage searchParams={searchParams} />
    </>
  );
}
