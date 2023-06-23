import styled, { keyframes } from 'styled-components';
import React from 'react';

const Skeleton = () => {
  return (
    <SSkeletonLayout>
      <li className="skeleton-item">
        <div className="skeleton-container">
          <div>
            <div className="skeleton-img" />
          </div>
          <div className="skeleton-info">
            <p className="skeleton-name" />
            <p className="skeleton-email" />
          </div>
        </div>
        <p className="skeleton-content" />
      </li>
    </SSkeletonLayout>
  );
};

const SkeletonMainProfile = () => {
  return (
    <SSProfileLayout>
      <div className="img"></div>
      <div className="info">
        <p></p>
        <p></p>
      </div>
      <div className="btn"></div>
    </SSProfileLayout>
  );
};

const SkeletonProductProfile = () => {
  return (
    <SSProductLayout>
      <p className="title"></p>
      <div className="img"></div>
      <div className="info"></div>
    </SSProductLayout>
  );
};

const WithSkeleton = ({ isLoading, type }) => {
  return (
    <div>
      {!isLoading && type === 'mainProfile' ? (
        <>
          <SkeletonMainProfile />
          <SkeletonProductProfile />
          <Skeleton />
        </>
      ) : !isLoading && type === 'detail' ? (
        <Skeleton />
      ) : (
        new Array(10).fill(1).map((_, i) => {
          return <Skeleton key={i} />;
        })
      )}
    </div>
  );
};

export default WithSkeleton;

const loading = keyframes` 
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  `;

// main profile ----------
const SSProfileLayout = styled.div`
  padding: 30px 16px 20px;
  border: 1px solid var(--darkgray);
  border-radius: 4px;

  & > * {
    margin: 0 auto;
  }
  .img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: var(--gray);
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 100%;
      background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
      animation: ${loading} 2s infinite linear;
    }
  }
  .info {
    margin: 16px auto 25px;
    width: 150px;

    p {
      background: var(--gray);

      width: 150px;
    }
    p:first-child {
      height: 36px;
      border-radius: 18px;
      margin-bottom: 15px;
      overflow: hidden;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 100%;
        background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
        animation: ${loading} 2s infinite linear;
      }
    }
    p:last-child {
      border-radius: 11px;
      height: 22px;
      overflow: hidden;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 100%;
        background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
        animation: ${loading} 2s infinite linear;
      }
    }
  }
  .btn {
    overflow: hidden;
    position: relative;
    border-radius: 17px;
    height: 33px;
    width: 200px;
    background: var(--gray);
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 100%;
      background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
      animation: ${loading} 2s infinite linear;
    }
  }
`;
// main profile ----------

// product profile ----------
const SSProductLayout = styled.div`
  margin-top: 15px;
  padding: 20px 16px 17px;
  border: 1px solid var(--darkgray);
  border-radius: 4px;

  .title {
    margin-bottom: 16px;
    background: var(--gray);
    overflow: hidden;
    position: relative;

    width: 100px;
    height: 22px;
    border-radius: 11px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 100%;
      background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
      animation: ${loading} 2s infinite linear;
    }
  }
  .img {
    background: var(--gray);
    height: 90px;
    width: 140px;
    border-radius: 8px;
    position: relative;
    margin-bottom: 10px;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 100%;
      background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
      animation: ${loading} 2s infinite linear;
    }
  }
  .info {
    background: var(--gray);
    overflow: hidden;
    width: 140px;
    position: relative;
    height: 30px;
    border-radius: 15px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 100%;
      background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
      animation: ${loading} 2s infinite linear;
    }
  }
`;
// product profile ----------

const SSkeletonLayout = styled.div`
  .skeleton-container {
    display: flex;
    width: 100%;
  }
  .skeleton-item {
    display: flex;
    align-items: center;
    margin: 15px 0;
    padding: 20px;
    border: 1px solid var(--darkgray);
    border-radius: 4px;
    position: relative;
    flex-direction: column;
  }

  .skeleton-img::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
    animation: ${loading} 2s infinite linear;
  }

  .skeleton-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gray);
    position: relative;
    overflow: hidden;
  }

  .skeleton-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
    margin-top: 3px;
  }

  .skeleton-name {
    width: 60%;
    height: 18px;
    border-radius: 9px;
    background: var(--gray);
    position: relative;
    overflow: hidden;
  }

  .skeleton-name::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
    animation: ${loading} 2s infinite linear;
  }

  .skeleton-email {
    width: 60%;
    height: 18px;
    border-radius: 9px;
    background: var(--gray);
    margin-top: 5px;
    position: relative;
    overflow: hidden;
  }

  .skeleton-email::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, var(--gray), #ddd, var(--gray));
    animation: ${loading} 2s infinite linear;
  }
  .skeleton-content {
    width: 100%;
    height: 50px;
    border-radius: 25px;
    background: var(--gray);
    margin-top: 5px;
    position: relative;
    overflow: hidden;
  }
`;
