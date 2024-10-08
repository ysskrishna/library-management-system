"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectRole, selectIsAuthenticated } from '@/redux/features/authSlice';
import { Role } from '@/common/constants';


export default function Page() {
  let router = useRouter();
  let isAuthenticated = useSelector(selectIsAuthenticated);
  let role = useSelector(selectRole);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      if (role === Role.USER) {
        router.push('/user/dashboard');
      } else if (role === Role.ADMIN) {
        router.push('/admin/dashboard');
      }
    }
  }, [isAuthenticated, role, router]);

  return <div />;
}