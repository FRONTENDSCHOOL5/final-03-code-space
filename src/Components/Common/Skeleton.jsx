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
const WithSkeleton = props => {
  return (
    <div>
      {!props.isLoading &&
        new Array(10).fill(1).map((_, i) => {
          return <Skeleton key={i} />;
        })}
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
    border: 1px solid #ccc;
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
  }

  .skeleton-name {
    width: 60%;
    height: 18px;
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
    background: var(--gray);
    margin-top: 3px;
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
    background: var(--gray);
    margin-top: 3px;
    position: relative;
    overflow: hidden;
  }
`;
