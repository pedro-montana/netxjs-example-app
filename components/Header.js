import Link from 'next/link';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 30px;
  color: rgb(20, 20, 20);
`;

const Header = () => {
  return (
    <Link href="/">
      <a>
        <H1>Example Next.js app</H1>
      </a>
    </Link>
  );
};

export default Header;