import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasicButton from '../../components/button/BasicButton';
import S from './style';
import Text from '../../components/text/size';
import BasicInput from '../../components/input/BasicInput';
import SelectBox from "../../components/selectBox/SelectBox";
import { Controller, useForm } from 'react-hook-form';
import { useRef } from "react";
import Radio from '../../components/radio/Radio';
import Checkbox from '../../components/checkbox/Checkbox';
import DatePickerSingle from './DatePickerSingle';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { setUser } from '../../modules/user';

const AddProfile = ({ onProfileComplete }) => {
    const calendarRef = useRef(null);
    const fileInputRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Redux에서 사용자 정보 가져오기
    const currentUser = useSelector(state => state.user.currentUser);
    
    // React Hook Form 설정
    const { register, handleSubmit, control, setValue, watch, getValues, formState: { isSubmitting, errors } } = useForm({ 
        mode: "onChange" 
    });
    
    // 편집 모드 확인 (URL 파라미터 또는 state)
    const urlParams = new URLSearchParams(location.search);
    const isEditMode = urlParams.get('mode') === 'edit' || location.state?.mode === 'edit';
    // currentUser가 없을 때 localStorage에서 정보 가져오기
    const fallbackUser = currentUser || {
        user_id: localStorage.getItem('user_id'),
        name: localStorage.getItem('userName'),
        dogProfile: {
            name: localStorage.getItem('userName'),
            profileImage: localStorage.getItem('profileImage')
        }
    };
    
    // 서버에서 프로필 데이터 가져오기
    const [serverProfileData, setServerProfileData] = useState(null);
    
    useEffect(() => {
        const fetchProfileData = async () => {
            if (isEditMode && fallbackUser.user_id) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${fallbackUser.user_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.user?.dogProfile) {
                            console.log('서버에서 가져온 프로필 데이터:', data.user.dogProfile);
                            setServerProfileData(data.user.dogProfile);
                        }
                    }
                } catch (error) {
                    console.error('프로필 데이터 조회 오류:', error);
                }
            }
        };
        
        fetchProfileData();
    }, [isEditMode, fallbackUser.user_id]);
    
    // localStorage의 userName을 최우선으로 사용하도록 userData 생성
    const baseUserData = location.state?.userData || serverProfileData || fallbackUser?.dogProfile || {};
    const userData = {
        ...baseUserData,
        name: localStorage.getItem('userName') || baseUserData.name || '방울이'
    };
    console.log('AddProfile - currentUser:', currentUser);
    console.log('AddProfile - fallbackUser:', fallbackUser);
    console.log('AddProfile - serverProfileData:', serverProfileData);
    console.log('AddProfile - userData:', userData);
    console.log('AddProfile - isEditMode:', isEditMode);
    
    // 선택 상태 관리
    const [selectedCharactor, setSelectedCharactor] = useState(1);
    const [selectedFavorite, setSelectedFavorite] = useState([1]);
    const [selectedCautions, setSelectedCautions] = useState([1]);
    const [isInitialized, setIsInitialized] = useState(false); // 필수사항이므로 기본값 [1]
    const [selectedDate, setSelectedDate] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [selectedImageFile, setSelectedImageFile] = useState(null); // 이미지 파일 상태 추가
    const [isUploading, setIsUploading] = useState(false);
    
    // 검증 상태
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // 역변환 함수들 (텍스트를 ID로 변환)
    const getCharactorId = (title) => {
        if (title.includes("나는 개인싸")) return 1;
        if (title.includes("나를 따르라")) return 2;
        if (title.includes("나랑만 있어줘")) return 3;
        if (title.includes("조금 조심스럽개")) return 4;
        return 1; // 기본값
    };

    const getFavoriteId = (title) => {
        if (title.includes("간식")) return 1;
        if (title.includes("산책")) return 2;
        if (title.includes("쉬기")) return 3;
        if (title.includes("애카")) return 4;
        return 1; // 기본값
    };

    const getCautionId = (title) => {
        if (title.includes("만지는 거 싫어")) return 1;
        if (title.includes("친구 무서워요")) return 2;
        if (title.includes("알러지가 있어요")) return 3;
        if (title.includes("소리에 놀라요")) return 4;
        return 1; // 기본값
    };

    // 초기값 설정
    useEffect(() => {
        if (isEditMode && userData && !isInitialized) {
            // 편집 모드일 때 기존 데이터로 초기화
            console.log('편집 모드 - 기존 데이터:', userData);
            
            // 기본 정보
            setValue("name", userData.name || '');
            setValue("breed", userData.breed || '');
            setValue("custombreed", userData.custombreed || '');
            setValue("weight", userData.weight || '');
            setValue("gender", userData.gender || 'male');
            setValue("neutralization", userData.neutralization || 'yes');
            setValue("address", userData.address || '');
            
            // 추가 정보
            setValue("nickname", userData.nickname || '');
            setValue("favoriteSnack", userData.favoriteSnack || '');
            setValue("walkingCourse", userData.walkingCourse || '');
            setValue("messageToFriend", userData.messageToFriend || '');
            
            // 성격 및 선택사항
            setValue("charactor", userData.charactor || '');
            setValue("favorites", userData.favorites || []);
            setValue("cautions", userData.cautions || []);
            
            // 생년월일
            if (userData.birthDate) {
                setSelectedDate(dayjs(userData.birthDate));
                setValue("birthDate", userData.birthDate);
            }
            
            // 프로필 이미지
            if (userData.profileImage) {
                setImageSrc(userData.profileImage);
            }
            
            // 상태 동기화 - 기존 데이터에 맞게 변환
            if (userData.charactor) {
                // 성격 텍스트를 ID로 변환
                const charactorId = getCharactorId(userData.charactor);
                setSelectedCharactor(charactorId);
            }
            
            if (userData.favorites && userData.favorites.length > 0) {
                // 좋아하는 것 텍스트를 ID로 변환
                const favoriteIds = userData.favorites.map(fav => getFavoriteId(fav)).filter(id => id);
                setSelectedFavorite(favoriteIds);
            }
            
            if (userData.cautions && userData.cautions.length > 0) {
                // 주의사항 텍스트를 ID로 변환
                const cautionIds = userData.cautions.map(caution => getCautionId(caution)).filter(id => id);
                setSelectedCautions(cautionIds);
            }
        } else if (!isEditMode) {
            // 신규 등록 시 기본값 설정
            setValue("charactor", 1);
            setValue("favorites", [1]);
            setValue("cautions", [1]); // 필수사항이므로 기본값 [1]
            setValue("gender", "male");
            
            // 소셜 로그인 사용자의 경우 기본 정보 설정
            if (currentUser) {
                // 사용자 이름이 있으면 설정
                if (currentUser.name) {
                    setValue("ownerName", currentUser.name);
                }
                
                // 이메일이 있으면 설정
                if (currentUser.email) {
                    setValue("email", currentUser.email);
                }
                
                // 프로필 이미지가 있으면 설정
                if (currentUser.profileImage) {
                    setImageSrc(currentUser.profileImage);
                }
            }
            
            // 상태 동기화
            setSelectedFavorite([1]);
            setSelectedCautions([1]);
            
            // 초기화 완료 표시
            setIsInitialized(true);
        }
    }, [isEditMode, setValue, currentUser, serverProfileData]);

    // 품종 옵션
    const BREEDS = [
        "말티푸", "시츄", "골든리트리버", "푸들", "보더콜리", "비숑프리제",
        "포메라니안", "닥스훈트", "치와와", "요크셔테리어", "이탈리안 그레이하운드", "퍼그", "기타"
    ];

    // 주소 검색
    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setValue("address", data.roadAddress);
            },
        }).open();
    };

    // 이미지 선택 및 업로드
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // 파일 크기 체크 (5MB 제한)
            if (file.size > 5 * 1024 * 1024) {
                alert('이미지 파일 크기는 5MB 이하여야 합니다.');
                return;
            }

            setIsUploading(true);
            
            try {
                // FormData 생성 (백엔드에 맞게 'profileImage' 키 사용)
                const formData = new FormData();
                formData.append('profileImage', file);
                
                // 백엔드에 이미지 업로드 (올바른 경로 사용)
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/images/profile`, {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    const result = await response.json();
                    // 백엔드에서 반환된 이미지 URL 사용
                    const imageUrl = result.imageUrl;
                    setImageSrc(imageUrl);
                    console.log('이미지 업로드 성공:', imageUrl);
                } else {
                    throw new Error('이미지 업로드 실패');
                }
            } catch (error) {
                console.error('이미지 업로드 오류:', error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
                // 업로드 실패 시 로컬 미리보기만
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result);
                };
                reader.readAsDataURL(file);
            } finally {
                setIsUploading(false);
            }
        }
    };

    // 성별 선택
    const handleGenderClick = (gender) => {
        setValue('gender', gender, { shouldValidate: true });
    };

    // 성격 선택
    const selectCharactor = (id) => {
        console.log('🔥 성격 선택 함수 호출됨:', id);
        console.log('🔥 현재 selectedCharactor:', selectedCharactor);
        setSelectedCharactor(id);
        setValue("charactor", id, { shouldValidate: true });
        console.log('🔥 성격 선택 후 selectedCharactor:', id);
        console.log('🔥 setValue 호출 완료');
    };

    // 좋아하는 것 선택 (다중선택)
    const selectFavorite = (id) => {
        console.log('🔥 좋아하는 것 선택 함수 호출됨:', id);
        console.log('🔥 현재 selectedFavorite:', selectedFavorite);
        setSelectedFavorite((prev) => {
            const updated = prev.includes(id) 
                ? prev.filter((v) => v !== id) 
                : [...prev, id];
            console.log('🔥 좋아하는 것 선택 후 updated:', updated);
            setValue("favorites", updated, { shouldValidate: true });
            return updated;
        });
    };

    // 주의할 점 선택 (다중선택)
    const selectCautions = (id) => {
        setSelectedCautions((prev) => {
            const updated = prev.includes(id) 
                ? prev.filter((v) => v !== id) 
                : [...prev, id];
            setValue("cautions", updated, { shouldValidate: true });
            return updated;
        });
    };

    // 폼 제출
    const handleFormSubmit = async (data) => {
        console.log('=== handleFormSubmit 함수 호출됨 ===');
        console.log('받은 데이터:', data);
        console.log('selectedDate:', selectedDate);
        console.log('selectedCharactor:', selectedCharactor);
        console.log('selectedFavorite:', selectedFavorite);
        console.log('selectedCautions:', selectedCautions);
        console.log('폼 에러:', errors);
        
        setHasSubmitted(true);
        
        // 카테고리별 필수 입력값 검증
        const missingCategories = [];
        
        // 1. 기본정보 카테고리 검증
        const basicInfoMissing = [];
        console.log('=== 기본정보 검증 ===');
        console.log('data.name:', data.name);
        console.log('data.weight:', data.weight);
        console.log('data.birthDate:', data.birthDate);
        console.log('selectedDate:', selectedDate);
        console.log('data.gender:', data.gender);
        console.log('data.address:', data.address);
        console.log('data.breed:', data.breed);
        
        if (!data.name || data.name.trim() === '') {
            basicInfoMissing.push('멍멍이 이름');
        }
        if (!data.weight || data.weight.trim() === '') {
            basicInfoMissing.push('몸무게');
        }
        if (!data.birthDate && !selectedDate) {
            basicInfoMissing.push('생년월일');
        }
        if (!data.gender) {
            basicInfoMissing.push('성별');
        }
        if (!data.address || data.address.trim() === '') {
            basicInfoMissing.push('주소');
        }
        if (!data.breed) {
            basicInfoMissing.push('품종');
        }
        
        if (basicInfoMissing.length > 0) {
            missingCategories.push('기본정보');
            console.log('기본정보 누락:', basicInfoMissing);
        }
        
        // 2. 프로필 카드정보 카테고리 검증
        const profileCardMissing = [];
        console.log('=== 프로필 카드정보 검증 ===');
        console.log('data.nickname:', data.nickname);
        console.log('data.favoriteSnack:', data.favoriteSnack);
        console.log('data.walkingCourse:', data.walkingCourse);
        console.log('data.messageToFriend:', data.messageToFriend);
        
        if (!data.nickname || data.nickname.trim() === '') {
            profileCardMissing.push('별명');
        }
        if (!data.favoriteSnack || data.favoriteSnack.trim() === '') {
            profileCardMissing.push('좋아하는 간식');
        }
        if (!data.walkingCourse || data.walkingCourse.trim() === '') {
            profileCardMissing.push('산책 코스');
        }
        if (!data.messageToFriend || data.messageToFriend.trim() === '') {
            profileCardMissing.push('친구에게 한마디');
        }
        
        if (profileCardMissing.length > 0) {
            missingCategories.push('프로필 카드정보');
            console.log('프로필 카드정보 누락:', profileCardMissing);
        }
        
        // 3. 기타 정보 카테고리 검증
        const otherInfoMissing = [];
        console.log('=== 기타 정보 검증 ===');
        console.log('selectedCharactor:', selectedCharactor);
        console.log('selectedFavorite:', selectedFavorite);
        console.log('selectedCautions:', selectedCautions);
        
        if (!selectedCharactor) {
            otherInfoMissing.push('성격');
        }
        if (!selectedFavorite || selectedFavorite.length === 0) {
            otherInfoMissing.push('좋아하는 것');
        }
        if (!selectedCautions || selectedCautions.length === 0) {
            otherInfoMissing.push('주의해주세요');
        }
        
        if (otherInfoMissing.length > 0) {
            missingCategories.push('기타 정보');
            console.log('기타 정보 누락:', otherInfoMissing);
        }
        
        console.log('누락된 카테고리들:', missingCategories);
        
        // 필수 입력값이 누락된 경우
        if (missingCategories.length > 0) {
            alert(`다음 카테고리의 필수 항목이 누락되었습니다:\n\n${missingCategories.join('\n')}`);
            return;
        }
        
        // 모든 검증 통과
        console.log('프로필 등록 제출 데이터:', data);
        
        // 숫자를 실제 타이틀로 변환하는 함수
        const getCharactorTitle = (id) => {
            switch(id) {
                case 1: return "나는 개인싸! (누구와도 잘 지내요)";
                case 2: return "나를 따르라! (가만히 있지 못해요!)";
                case 3: return "나랑만 있어줘... (애착형이고 애교가 많아요)";
                case 4: return "조금 조심스럽개! (수줍음이 많아요)";
                default: return "";
            }
        };

        const getFavoriteTitle = (id) => {
            switch(id) {
                case 1: return "간식이 좋아 (육포, 개껌, 치즈...)";
                case 2: return "산책이 짱! (산책 없이 못살아!)";
                case 3: return "쉬는 게 최고 (힐링이 최고다 멍!)";
                case 4: return "애카 가자! (친구들이 제일 좋아!)";
                default: return "";
            }
        };

        const getCautionTitle = (id) => {
            switch(id) {
                case 1: return "만지는 거 싫어! (나는 예민해요)";
                case 2: return "친구 무서워요 (나를 보호해주세요)";
                case 3: return "알러지가 있어요 (다 먹을 수 없어요😢)";
                case 4: return "소리에 놀라요 (나는 소리에 민감해요!)";
                default: return "";
            }
        };

        
        // 기본값 설정 및 타이틀로 변환
        const profileData = {
            ...data,
            charactor: getCharactorTitle(data.charactor || selectedCharactor),
            favorites: (selectedFavorite || [1]).map(getFavoriteTitle).filter(Boolean),
            cautions: (selectedCautions || [1]).map(getCautionTitle).filter(Boolean),
            gender: data.gender || 'male',
            profileImage: imageSrc, // 이미지 URL 또는 base64 데이터
        };
        
        console.log('=== 프로필 데이터 변환 확인 ===');
        console.log('selectedFavorite (원본):', selectedFavorite);
        console.log('selectedCautions (원본):', selectedCautions);
        console.log('favorites (변환됨):', profileData.favorites);
        console.log('cautions (변환됨):', profileData.cautions);
        
        // 이미지 파일이 있으면 FormData로 처리
        if (selectedImageFile) {
            const formData = new FormData();
            
            // 이미지 파일 추가
            formData.append('profileImage', selectedImageFile);
            
            // 나머지 데이터는 JSON으로 변환하여 추가
            const { profilePhoto, ...textData } = profileData;
            formData.append('data', JSON.stringify(textData));
            
            console.log('FormData로 전송:', formData);
        }
        
        if (isEditMode) {
            // 편집 모드일 때는 프로필 데이터를 localStorage에 저장하고 건강정보 페이지로 이동
            console.log('=== 편집 모드 - localStorage에 저장할 데이터 ===');
            console.log('selectedCharactor (원본):', selectedCharactor);
            console.log('profileData.charactor (변환됨):', profileData.charactor);
            console.log('selectedFavorite (원본):', selectedFavorite);
            console.log('profileData.favorites (변환됨):', profileData.favorites);
            console.log('selectedCautions (원본):', selectedCautions);
            console.log('profileData.cautions (변환됨):', profileData.cautions);
            console.log('전체 profileData:', profileData);
            localStorage.setItem('editProfileData', JSON.stringify(profileData));
            navigate('/profile/add-health?mode=edit');
        } else if (onProfileComplete) {
            onProfileComplete(profileData);
        }
    };

    // 에러 메시지 컴포넌트
    const ErrorMessage = ({ show, message }) => {
        if (!show) return null;
        return (
            <div style={{ textAlign: "center" }}>
                <span style={{ color: "#f74c26" }}>{message}</span>
            </div>
        );
    };

    return (
        <div style={{marginTop:"195px",marginBottom:"550px"}}>
            {/* 기본정보 섹션 */}
            <S.TitleWrap> 
                <div style={{ fontSize: '18px', lineHeight: '1.5' }}>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold', fontSize: '30px'}}>
                        {isEditMode ? '프로필 편집' : '기본정보'}
                    </S.highlight>
                </div>
            </S.TitleWrap>
            
            {/* 이름과 몸무게 */}
            <S.inputinline>
                <S.NamekgWrap style={{marginRight:'30px'}}>
                    <S.CaptionTitlewrap>내 이름은,</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="멍이의 이름을 입력해주세요"
                        {...register("name", { 
                            required: "멍멍이 이름을 입력해주세요" 
                        })}
                    />
                    <ErrorMessage
                        show={hasSubmitted && errors.name}
                        message={errors.name?.message}   
                    />
                </S.NamekgWrap>
                <S.NamekgWrap>
                    <S.CaptionTitlewrap>몸무게</S.CaptionTitlewrap>
                    <S.InputButtonWrapper>
                        <Text.Body3>kg</Text.Body3>
                        <BasicInput 
                            type="text" 
                            placeholder=""
                            {...register("weight", { 
                                required: "몸무게를 입력해주세요" 
                            })}
                        /> 
                    </S.InputButtonWrapper>
                    <ErrorMessage
                        show={hasSubmitted && errors.weight}
                        message={errors.weight?.message}  
                    />
                </S.NamekgWrap>
            </S.inputinline>

            {/* 생년월일 */}
            <S.InputReguler style={{position:'relative'}}>
                <S.CaptionTitlewrap>생년월일</S.CaptionTitlewrap>
                <div style={{position:'relative', width:'100%'}}>
                    <BasicInput
                        defaultValue={selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""}
                        placeholder="생년월일을 입력해주세요"
                        required
                        readOnly
                        onClick={() => calendarRef.current?.setFocus()}
                    />
                    <img 
                        src="/assets/icons/calendar.svg" 
                        width={30} height={30} alt="캘린더" 
                        onClick={() => calendarRef.current?.setFocus()}
    
                    />
                    <Controller 
                        name="birthDate" 
                        control={control}
                        rules={{ required: "생년월일을 선택해주세요" }}
                        render={({ field }) => ( 
                            <DatePickerSingle 
                                ref={calendarRef} 
                                selected={field.value} 
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    setValue("birthDate", date);
                                }}
                            />
                        )}
                    /> 
                </div>
                <ErrorMessage
                    show={hasSubmitted && errors.birthDate}
                    message={errors.birthDate?.message}  
                />
            </S.InputReguler>

            {/* 성별 */}
            <S.InputReguler>
                <S.CaptionTitlewrap>성별</S.CaptionTitlewrap>
                <S.inputinline style={{marginTop:"0"}}>
                    <S.NamekgWrap style={{marginRight:"30px"}}>
                        <BasicButton 
                            basicButton="small" 
                            variant={watch("gender") === "male" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => handleGenderClick('male')}>
                            남
                        </BasicButton>
                    </S.NamekgWrap>
                    <S.NamekgWrap>
                        <BasicButton
                            basicButton="small" 
                            variant={watch("gender") === "female" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => handleGenderClick('female')}>                                
                            여
                        </BasicButton>
                    </S.NamekgWrap>
                </S.inputinline>
                <input
                    type='hidden'
                    {...register("gender", {
                        required:"성별을 선택해주세요.", 
                        validate: (value) => value === "male" || value === "female" || "성별을 선택해주세요."
                    })}
                />
                <ErrorMessage
                    show={hasSubmitted && errors.gender}
                    message={errors.gender?.message}  
                />
            </S.InputReguler>

            {/* 주소 */}
            <S.InputReguler>
                <S.CaptionTitlewrap>주소</S.CaptionTitlewrap>
                <div 
                    onClick={handleSearchAddress} 
                    style={{
                        width:'100%',
                        display:'flex',
                        alignItems: 'center',
                        position:'relative',
                        cursor:"pointer",
                    }}>
                    <BasicInput 
                        type="text" 
                        value={watch("address") || ""}
                        placeholder="도로명 주소를 검색하세요"
                        readOnly
                        {...register("address", { required: "주소를 검색해주세요" })}
                    />
                    <img 
                        src="/assets/icons/search.svg" 
                        width={30} height={30} 
                        alt="검색" 
                    />
                </div>
                <ErrorMessage
                    show={hasSubmitted && errors.address}
                    message={errors.address?.message}  
                />
            </S.InputReguler>

            {/* 품종 */}
            <S.InputReguler>
                <S.CaptionTitlewrap>품종</S.CaptionTitlewrap>
                <S.InputButtonWrapper>
                    <SelectBox
                        options={BREEDS}
                        placeholder="강아지 품종을 선택하세요."
                        defaultValue={userData.breed || ''}
                        {...register("breed", {required: true})}
                        onSelect={(v) => setValue("breed", v)}
                        style={{width:"100%", cursor:"pointer"}}
                    />
                </S.InputButtonWrapper>
                {watch("breed") === "기타" && (
                    <S.InputButtonWrapper style={{marginTop:"10px"}}>
                        <BasicInput
                            type="text"
                            placeholder="직접 입력해주세요"
                            {...register("custombreed")}
                            style={{
                                width: "100%",
                                height: "64px",
                                padding: "20px 24px"
                            }}
                        />
                    </S.InputButtonWrapper>
                )}
                <ErrorMessage
                    show={hasSubmitted && errors.breed}
                    message={errors.breed?.message}  
                />
            </S.InputReguler>

            {/* 프로필 카드 섹션 */}
            <S.TitleWrap style={{marginTop:"100px"}}> 
                <Text.Body1>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold', fontSize: '30px'}}>프로필 카드 정보</S.highlight>
                </Text.Body1>
            </S.TitleWrap>
            
            <S.inputinline style={{gap:"50px"}}>
                {/* 프로필 사진 */}
                <S.NamekgWrap style={{display:"flex", justifyContent:"center"}}>
                    <S.CaptionTitlewrap style={{textAlign:"center" , fontSize:"20px" , color:"#CE5347"}}>
                        우리 멍이의 대표 프로필 사진을 등록해주세요!
                    </S.CaptionTitlewrap>
                    <S.ProfileWrap onClick={() => fileInputRef.current.click()}>
                        <S.Profile 
                            src={imageSrc || "/assets/img/progile/camera.svg"} 
                        />
                    </S.ProfileWrap>
                    <BasicButton
                        roundButton="small"
                        variant="filled"
                        style={{marginTop:"60px" , }}
                        onClick={() => fileInputRef.current.click()}
                        disabled={isUploading}
                    >
                        {isUploading ? '업로드 중...' : '사진 등록하기'}
                    </BasicButton>
                  
                    <input
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <ErrorMessage
                        show={hasSubmitted && errors.profilePhoto}
                        message={errors.profilePhoto?.message}  
                    />
                </S.NamekgWrap>
                
                {/* 프로필 정보 */}
                <S.NamekgWrap>
                    <S.CaptionTitlewrap>별명</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="간식요정"
                        {...register("nickname", { required: true })}
                        style={{marginTop:"20px"}}
                    />
                    <ErrorMessage 
                        show={hasSubmitted && errors.nickname}
                        message={errors.nickname?.message}  
                    />
                    
                    <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>좋아하는 간식</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="육포, 치즈, 연어 ..."
                        {...register("favoriteSnack", { required: true })}
                        style={{marginTop:"20px"}}
                    />
                    <ErrorMessage
                        show={hasSubmitted && errors.favoriteSnack}
                        message={errors.favoriteSnack?.message}  
                    />
                    
                    <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>좋아하는 산책코스</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="집 주변 공원"
                        {...register("walkingCourse", { required: true })}
                        style={{marginTop:"20px"}}
                    />
                    <ErrorMessage
                        show={hasSubmitted && errors.walkingCourse}
                        message={errors.walkingCourse?.message}  
                    />
                    
                    <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>새 친구에게 한마디!</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="친구들과 뛰어 놀 준비 완료!"
                        maxLength={15}
                        {...register("messageToFriend", { 
                            required: true,
                            maxLength: {
                                value: 15,
                                message: "15글자 이내로 작성해주세요"
                            }
                        })}
                        style={{marginTop:"20px"}}
                    />
                    <div style={{textAlign: "right", fontSize: "12px", color: "#666", marginTop: "5px"}}>
                        {watch("messageToFriend")?.length || 0}/15
                    </div>
                    <ErrorMessage
                        show={hasSubmitted && errors.messageToFriend}
                        message={errors.messageToFriend?.message}  
                    />
                </S.NamekgWrap>                
            </S.inputinline>

            {/* 기타 정보 섹션 */}
            <S.TitleWrap style={{marginTop:"100px"}}> 
                <Text.Body1>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold', fontSize: '30px'}}>기타 정보</S.highlight>
                </Text.Body1>
            </S.TitleWrap>
            
            {/* 성격 선택 */}
            <S.inputinline>
                <S.CaptionTitlewrap style={{display:'flex', alignItems:'center'}}>
                    <Text.Body3><span style={{color: '#CE5347', fontWeight: 'bold' , marginRight:"10px"}}>*</span>우리 멍이의 성격은?</Text.Body3>
                    <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(단일선택)</span>
                </S.CaptionTitlewrap>
            </S.inputinline>
            
            <S.inputinlineImg>
                <S.NamekgWrap onClick={()=>selectCharactor(1)}>
                    <S.radioselect src='/assets/img/progile/personality/popularity.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나는 개인싸!<br/></Text.Body2>
                    <Text.Body3>누구와도 잘 지내요</Text.Body3>
                    <Radio checked={selectedCharactor === 1} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={()=>selectCharactor(2)}>
                    <S.radioselect src='/assets/img/progile/personality/leader.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나를 따르라!<br/></Text.Body2>
                    <Text.Body3>가만히 있지 못해요!</Text.Body3>
                    <Radio checked={selectedCharactor === 2} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={()=>selectCharactor(3)}>
                    <S.radioselect src='/assets/img/progile/personality/attractiveness.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나랑만 있어줘...<br/></Text.Body2>
                    <Text.Body3>애착형이고 애교가 많아요</Text.Body3>
                    <Radio checked={selectedCharactor === 3} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={()=>selectCharactor(4)}>
                    <S.radioselect src='/assets/img/progile/personality/shy.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>조금 조심스럽개!<br/></Text.Body2>
                    <Text.Body3>수줍음이 많아요</Text.Body3>
                    <Radio checked={selectedCharactor === 4} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinlineImg>
            
            <input
                type='hidden'
                {...register("charactor", {
                    required:"멍이의 성격을 선택해주세요", 
                    validate: (value) => {
                        const validOptions = [1, 2, 3, 4];
                        return validOptions.includes(value) || "멍이의 성격을 선택해주세요"
                    }
                })}
            />

            {/* 좋아하는 것 선택 */}
            <S.inputinline>
                <S.CaptionTitlewrap style={{display:'flex', alignItems:'center'}}>
                    <Text.Body3><span style={{color: '#CE5347', fontWeight: 'bold' , marginRight:"10px"}}>*</span>우리 멍이가 좋아하는 것은?</Text.Body3>
                    <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(다중선택가능)</span>
                </S.CaptionTitlewrap>
            </S.inputinline>
            
            <S.inputinlineImg>
                <S.NamekgWrap onClick={() => selectFavorite(1)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/snack.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>간식이 좋아<br/></Text.Body2>
                    <Text.Body3>육포, 개껌, 치즈...</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(1)} size="L" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(2)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/walk.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>산책이 짱!<br/></Text.Body2>
                    <Text.Body3>산책 없이 못살아!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(2)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(3)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/healing.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>쉬는 게 최고<br/></Text.Body2>
                    <Text.Body3>힐링이 최고다 멍!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(3)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(4)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/friend.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>애카 가자!<br/></Text.Body2>
                    <Text.Body3>친구들이 제일 좋아!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(4)} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinlineImg>

            {/* 주의할 점 선택 */}
            <S.inputinline>
                <S.CaptionTitlewrap style={{display:'flex', alignItems:'center'}}>
                    <Text.Body3><span style={{color: '#CE5347', fontWeight: 'bold' , marginRight:"10px"}}>*</span>주의해 주세요!</Text.Body3>
                    <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(다중선택가능)</span>
                </S.CaptionTitlewrap>
            </S.inputinline>

            <S.inputinlineImg>
                <S.NamekgWrap onClick={() => selectCautions(1)}>
                    <S.radioselect src='/assets/img/progile/Caution/touch.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>만지는 거 싫어!<br/></Text.Body2>
                    <Text.Body3>나는 예민해요</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(1)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectCautions(2)}>
                    <S.radioselect src='/assets/img/progile/Caution/bark.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>친구 무서워요<br/></Text.Body2>
                    <Text.Body3>나를 보호해주세요</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(2)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectCautions(3)}>
                    <S.radioselect src='/assets/img/progile/Caution/Allergy.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>알러지가 있어요<br/></Text.Body2>
                    <Text.Body3>다 먹을 수 없어요😢</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(3)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectCautions(4)}>
                    <S.radioselect src='/assets/img/progile/Caution/sound.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>소리에 놀라요<br/></Text.Body2>
                    <Text.Body3>나는 소리에 민감해요!</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(4)} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinlineImg>

            {/* 선택 정보 - 중성화 */}
            <S.CaptionTitlewrap style={{marginTop:"100px"}}>
                <Text.Body1>
                    <S.highlight style={{ fontWeight: 'bold'}}>중성화 여부</S.highlight>
                    <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(선택사항)</span>
                </Text.Body1>
            </S.CaptionTitlewrap>
            
            <S.inputinline style={{display:"flex", alignItems:"center"}}>
                <S.NamekgWrap style={{marginRight:'30px'}}>
                    <BasicButton 
                        basicButton="small" 
                        variant={watch("neutralization") === "yes" ? "filled" : "default"}
                        style={{width:"100%"}}
                        onClick={() => setValue("neutralization", "yes")}>
                        유
                    </BasicButton>
                </S.NamekgWrap>
                <S.NamekgWrap>
                    <BasicButton 
                        basicButton="small" 
                        variant={watch("neutralization") === "none" ? "filled" : "default"}
                        style={{width:"100%"}}
                        onClick={() => setValue("neutralization", "none")}>
                        무
                    </BasicButton>
                </S.NamekgWrap>
            </S.inputinline>

            {/* 제출 버튼 */}
            <S.InputReguler style={{marginTop:"182px"}}>
                <BasicButton 
                    basicButton="superSmall" 
                    variant="filled"
                    style={{width:"200px", cursor:'pointer'}}
                    onClick={() => {
                        console.log('버튼 클릭됨!');
                        // 폼 데이터 수동으로 가져오기
                        const formData = getValues();
                        console.log('폼 데이터:', formData);
                        handleFormSubmit(formData);
                    }}
                    type='button'
                    disabled={isSubmitting || isUploading}>
                    {isUploading ? '업로드 중...' : '다음'}
                </BasicButton>
            </S.InputReguler>
        </div>
    );
};

export default AddProfile;