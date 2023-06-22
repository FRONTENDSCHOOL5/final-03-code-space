import React from 'react';
import BottomNav from '../Components/Common/BottomNav';
import MainHeader from '../Components/Common/MainHeader';
import { motion } from 'framer-motion';

const MessagePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MainHeader type="profile" />
      <div></div>
      <BottomNav />
    </motion.div>
  );
};

export default MessagePage;
