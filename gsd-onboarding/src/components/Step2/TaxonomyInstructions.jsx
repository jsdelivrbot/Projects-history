import React from 'react';

export const TaxonomyInstructions = (props) => {
  return (
    <div>
      <h6>Taxonomy</h6>
      <p><strong>Group: </strong>Highest tier of the strategy taxonomy. This is the broadest filter. It is market agnostic.</p>
      <p><strong>Subgroup: </strong>Second tier of the strategy taxonomy. This is helps further refine the search and may be relevant to certain markets.</p>
      <p><strong>Strategy Name: </strong>Unique name of the strategy.</p>
    </div>
  );
};
