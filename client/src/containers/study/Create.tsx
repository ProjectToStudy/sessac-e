import React, { useState } from 'react';
import CreateComponent from 'components/study/Create';
import CategoryBS from 'components/study/components/CategoryBS';
import DetailP from 'components/study/DetailP';

const CreateContainer = () => {
    const [photoUrlList, setPhotoUrlList] = useState<string[]>([]);
    const [value, setValue] = useState<{ [key in string]: string }>({});

    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
    const [select, setSelect] = useState<string>('job');
    const [selectItem, setSelectItem] = useState<{ [key in string]: string[] }>({ job: [], purpose: [] });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;
        setPhotoUrlList((photoUrlList) => [...photoUrlList, URL.createObjectURL(files[0])]);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target as HTMLInputElement;
        setValue({ ...value, [name]: e.target.value });
    };

    const handleDeleteClick = (key: string) => {
        setValue({ ...value, [key]: '' });
    };

    const handleSelectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { name } = e.target as HTMLButtonElement;
        setSelect(name);
    };

    const handleSelectItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const { dataset } = e.target as HTMLLIElement;
        const { value } = dataset;
        if (!value) return;
        if (!selectItem[select].includes(value)) {
            setSelectItem({ ...selectItem, [select]: [...selectItem[select], value] });
        } else setSelectItem({ ...selectItem, [select]: selectItem[select].filter((item) => item !== value) });
    };

    const handleResetSelectClick = () => {
        setSelectItem({ job: [], purpose: [] });
    };

    return (
        <div id="container">
            <CreateComponent
                thumbnailList={photoUrlList}
                value={value}
                onFileChange={handleFileChange}
                onTextChange={handleTextChange}
                onDelClick={handleDeleteClick}
                onCategoryClick={() => setIsCategoryOpen(true)}
                onDetailClick={() => setIsDetailOpen(true)}
            />
            {isCategoryOpen && (
                <CategoryBS
                    select={select}
                    selectItem={selectItem}
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
