import { useRouter } from 'vue-router';

const goHome = () => {
  const router = useRouter();
  router.push('/');
};

export { goHome };
