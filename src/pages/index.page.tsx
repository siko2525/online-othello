import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Cell } from 'src/components/Cell';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const response = await apiClient.board.$get().catch(returnNull);
    if (response !== null) {
      setBoard(response);
    }
  };
  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({
      body: { x, y },
    });
  };
  useEffect(() => {
    fetchBoard();
  }, []);

  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <Cell key={`${x}-${y}`} x={x} y={y} color={color} onClick={() => onClick(x, y)} />
            ))
          )}
        </div>
        {/* <div className={styles.turn}>{turnColor === 1 ? '黒のターン' : '白のターン'}</div> */}
      </div>
    </>
  );
};

export default Home;
