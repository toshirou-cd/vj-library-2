import React from 'react';

const DetailImage: React.FC = () => {
    return (
        <img
              src={require('@app/assets/images/person_working_in_warehouse.png')}
              alt="person working in warehouse"
            />
    );
}

export default DetailImage;