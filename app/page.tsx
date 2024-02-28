import Pagination from './component/Pagination';
import IssuesPage from './issues/list/page';

export default function Home() {
  return (
    <>
      <Pagination itemCount={100} pageSize={10} currentPage={2} />
    </>
  );
}
