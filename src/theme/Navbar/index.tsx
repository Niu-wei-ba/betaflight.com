import React, { type ReactNode } from 'react';
import NavbarContent from '@theme/Navbar/Content';
import NavbarLayout from '@theme/Navbar/Layout';

export default function Navbar(): ReactNode {
  return (
    <NavbarLayout>
      <NavbarContent />
    </NavbarLayout>
  );
}
