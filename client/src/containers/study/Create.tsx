import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { CreateStudyState } from '../../recoil/study';
import CreateComponent from 'components/study/Create';
import CategoryBS from 'components/study/components/CategoryBS';
import DetailP from 'components/study/DetailP';

const CreateContainer = () => {
    const [value, setValue] = useRecoilState(CreateStudyState);
    const { category } = value;

    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
    const [select, setSelect] = useState<string>('job');

    const handleSelectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { name } = e.target as HTMLButtonElement;
        setSelect(name);
    };

    const handleSelectItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const { dataset } = e.target as HTMLLIElement;
        if (!dataset.value) return;

        if (!category.includes(Number(dataset.value))) {
            setValue({ ...value, category: [...value.category, Number(dataset.value)] });
        } else {
            setValue({ ...value, category: value.category.filter((item) => item !== Number(dataset.value)) });
        }
    };

    const handleResetSelectClick = () => {
        setValue({ ...value, category: [] });
    };

    return (
        <div id="container">
            <CreateComponent
                onCategoryClick={() => setIsCategoryOpen(true)}
                onDetailClick={() => setIsDetailOpen(true)}
            />
            {isCategoryOpen && (
                <CategoryBS
                    select={select}
                    selectItem={value.category}
                    onSelectClick={handleSelectClick}
                    onSelectItemClick={handleSelectItemClick}
                    onResetClick={handleResetSelectClick}
                    onClose={() => setIsCategoryOpen(false)}
                />
            )}
            {isDetailOpen && <DetailP />}
        </div>
    );
};

export default CreateContainer;
