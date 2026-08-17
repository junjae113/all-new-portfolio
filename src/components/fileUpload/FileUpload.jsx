import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import S from './style';



const FileUploade = () => {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDelete = () => {
    setFileName('');
    fileInputRef.current.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      fileInputRef.current.files = e.dataTransfer.files;
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <S.Wrapper>
      <S.HiddenInput
        type="file"
        id="upload"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <S.DropInput
        type="text"
        readOnly
        placeholder="파일을 선택하세요"
        value={fileName}
        onDrop={handleDrop}
        onDragOver={(e) => {
          preventDefault(e);
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          preventDefault(e);
          setDragOver(false);
        }}
        dragOver={dragOver}
      />
      {fileName && <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>}

      <S.UploadButton htmlFor="upload">찾아보기</S.UploadButton>
    </S.Wrapper>
  );
}

export default FileUploade;
