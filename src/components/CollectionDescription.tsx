import React from 'react';
import { formatCollectionDescription } from '../lib/collectionStats';
import type { Shoe } from '../lib/types';

interface CollectionDescriptionProps {
  shoes: Shoe[];
}

export function CollectionDescription({ shoes }: CollectionDescriptionProps) {
  const description = formatCollectionDescription(shoes);
  
  if (!description) return null;

  // Split the description into parts
  const parts = description.split('.');
  const firstSentence = parts[0] + '.';
  const secondSentence = parts[1] ? parts[1] + '.' : '';
  const thirdSentence = parts[2] || '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="leading-snug text-center font-semibold text-lg">
        <span className="text-gray-700">{firstSentence}</span>
        <span className="text-gray-500">{secondSentence}</span>
        <span className="text-gray-700">{thirdSentence}</span>
      </p>
    </div>
  );
}