import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setUserStatus } from '../../components/modules/user';
import S from './style';
import BasicButton from '../../components/button/BasicButton';
import Text from "../../components/text/size";
import BasicInput from "../../components/input/BasicInput";
import PasswordInput from "../../components/input/PasswordInput";
import ButtonWithInput from "../../components/input/ButtonWithInput";
import SelectBox from "../../components/selectBox/SelectBox";

// 필수 표시용 스타일드 span
const RequiredSpan = styled.span`
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

const SignUpInfo = () => {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [selectedEmailDomain, setSelectedEmailDomain] = useState('');
  const [showCustomDomain, setShowCustomDomain] = useState(false);
  const [isUserIdChecked, setIsUserIdChecked] = useState(false); // 중복확인 상태
  const [userIdCheckMessage, setUserIdCheckMessage] = useState(''); // 중복확인 메시지
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복확인 상태
  const [isSocialLogin, setIsSocialLogin] = useState(false); // 소셜 로그인 여부
  const [socialUserData, setSocialUserData] = useState(null); // 소셜 로그인 사용자 정보
  
  const {
    register, handleSubmit, getValues, watch, setValue, formState: {isSubmitting, isSubmitted, errors, isValid }
  } = useForm({ mode: "onChange" })

  // 소셜 로그인 사용자 정보 확인
  useEffect(() => {
    console.log('=== SignUpInfo useEffect 실행 ===');
    console.log('SignUpInfo 페이지 로딩됨');
    
    const socialData = localStorage.getItem('socialUserData');
    const isRegularSignup = localStorage.getItem('isRegularSignup');
    console.log('localStorage에서 읽은 socialData:', socialData);
    console.log('일반 회원가입 여부:', isRegularSignup);
    
    // 소셜 로그인 감지 로직 개선
    const hasValidSocialData = socialData && isRegularSignup !== 'true';
    console.log('유효한 소셜 데이터 존재 여부:', hasValidSocialData);
    
    if (hasValidSocialData) {
      try {
        const parsedData = JSON.parse(socialData);
        
        // 소셜 데이터 유효성 검사 추가
        if (parsedData && parsedData.user_id && parsedData.email && parsedData.name && parsedData.provider) {
          setSocialUserData(parsedData);
          setIsSocialLogin(true);
          console.log('유효한 소셜 로그인 데이터 감지:', parsedData);
          console.log('소셜 로그인 provider:', parsedData.provider);
        } else {
          console.log('소셜 데이터가 불완전함 - 일반 회원가입으로 처리');
          console.log('누락된 필드:', {
            user_id: !!parsedData?.user_id,
            email: !!parsedData?.email,
            name: !!parsedData?.name,
            provider: !!parsedData?.provider
          });
          setIsSocialLogin(false);
          setSocialUserData(null);
          localStorage.removeItem('socialUserData'); // 불완전한 데이터 정리
        }
        
        // 소셜 로그인 사용자의 경우 이름과 이메일을 미리 설정
        setTimeout(() => {
          setValue('userId', parsedData.user_id || parsedData.email.split('@')[0]);
          setValue('name', parsedData.name);
          // 소셜 로그인 사용자는 전체 이메일을 설정
          setValue('email', parsedData.email);
          
          // 폼 값 강제 업데이트
          const form = document.querySelector('form');
          if (form) {
            const userIdInput = form.querySelector('input[name="userId"]');
            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            if (userIdInput) userIdInput.value = parsedData.user_id || parsedData.email.split('@')[0];
            if (nameInput) nameInput.value = parsedData.name;
            if (emailInput) emailInput.value = parsedData.email; // 전체 이메일 설정
          }
          
          // 소셜 로그인 사용자는 중복확인 완료 상태로 설정
          setIsUserIdChecked(true);
          
          console.log('소셜 로그인 사용자 정보 설정 완료:', parsedData);
        }, 100);
        
        console.log('소셜 로그인 사용자 정보 설정:', parsedData);
      } catch (error) {
        console.error('소셜 로그인 데이터 파싱 오류:', error);
      }
    } else {
      // 소셜 로그인 데이터가 없거나 일반 회원가입인 경우
      console.log('소셜 로그인 데이터 없음 또는 일반 회원가입으로 처리');
      setIsSocialLogin(false);
      setSocialUserData(null);
      
      // 소셜 로그인 데이터가 있지만 isRegularSignup이 true인 경우 정리
      if (socialData && isRegularSignup === 'true') {
        console.log('소셜 데이터가 있지만 일반 회원가입 플래그가 설정됨 - 소셜 데이터 정리');
        localStorage.removeItem('socialUserData');
      }
      
      // 일반 회원가입 플래그가 있으면 일반 회원가입 모드로 설정
      if (isRegularSignup) {
        console.log('일반 회원가입 모드로 설정');
        // 일반 회원가입 플래그 제거 (한 번만 사용)
        localStorage.removeItem('isRegularSignup');
      }
      
      // 폼 초기화
      setValue('userId', '');
      setValue('name', '');
      setValue('email', '');
      setValue('password', '');
      setValue('passwordConfirm', '');
      setValue('phone', '');
      setValue('birthday', '');
      setValue('customDomain', '');
      
      // 상태 초기화
      setSelectedEmailDomain('');
      setShowCustomDomain(false);
      setIsUserIdChecked(false);
      setUserIdCheckMessage('');
      setBirthYear('');
      setBirthMonth('');
      setBirthDay('');
      
      console.log('일반 회원가입 모드 - 폼 초기화 완료');
    }
  }, [setValue]);

  // 모든 필수 필드의 값 감시
  const userId = watch("userId");
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const name = watch("name");
  const phone = watch("phone");
  const birthday = watch("birthday");
  const email = watch("email");
  const customDomain = watch("customDomain");

  // 소셜 로그인 사용자 정보 감시
  useEffect(() => {
    console.log('=== 폼 값 변화 감지 ===');
    console.log('현재 이름 값:', name);
    console.log('현재 이메일 값:', email);
    console.log('소셜 로그인 상태:', isSocialLogin);
    console.log('소셜 사용자 데이터:', socialUserData);
  }, [name, email, isSocialLogin, socialUserData]);

  // 년도, 월, 일 옵션 생성
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 중복확인 함수
  const handleUserIdCheck = async (e) => {
    console.log('중복확인 버튼 클릭됨!');
    e.preventDefault();
    e.stopPropagation();
    
    const currentUserId = watch("userId");
    console.log('현재 입력된 아이디:', currentUserId);
    
    if (!currentUserId) {
      setUserIdCheckMessage('아이디를 먼저 입력해주세요.');
      setIsUserIdChecked(false);
      return;
    }
    
    // 아이디 형식 검증
    const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;
    if (!userIdRegex.test(currentUserId)) {
      setUserIdCheckMessage('영문과 숫자를 포함한 6자리 이상으로 입력해주세요.');
      setIsUserIdChecked(false);
      return;
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/check-userid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUserId
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setUserIdCheckMessage('사용 가능한 아이디입니다.');
        setIsUserIdChecked(true);
      } else {
        setUserIdCheckMessage(result.message || '이미 사용 중인 아이디입니다.');
        setIsUserIdChecked(false);
      }
    } catch (error) {
      console.error('중복확인 오류:', error);
      setUserIdCheckMessage('중복확인 중 오류가 발생했습니다.');
      setIsUserIdChecked(false);
    }
  };

  // 이메일 도메인 선택 핸들러
  const handleEmailDomainSelect = (domain) => {
    setSelectedEmailDomain(domain);
    if (domain === "직접입력") {
      setShowCustomDomain(true);
      setValue("customDomain", "");
    } else {
      setShowCustomDomain(false);
      // 도메인만 선택하고 이메일 앞에 붙이지 않음
      // const emailValue = watch("email");
      // if (emailValue) {
      //   setValue("email", `${emailValue}@${domain}`);
      // }
      

    }
  };

  // 이메일 중복확인 함수 (일반 회원가입용)
  const handleEmailCheck = async () => {
    const currentEmail = watch("email");
    const currentDomain = watch("customDomain") || selectedEmailDomain;
    
    if (!currentEmail || !currentDomain) {
      alert('이메일을 완성해주세요.');
      return;
    }
    
    const fullEmail = `${currentEmail}@${currentDomain === "직접입력" ? currentDomain : currentDomain}`;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: fullEmail }),
      });
      
      const result = await response.json();
      
      if (response.ok && !result.exists) {
        alert('사용 가능한 이메일입니다.');
        setIsEmailChecked(true);
      } else {
        if (result.isSocialLogin) {
          alert('이미 소셜 로그인으로 가입된 이메일입니다. 소셜 로그인을 이용해주세요.');
        } else {
          alert('이미 가입된 이메일입니다. 일반 로그인을 이용해주세요.');
        }
        setIsEmailChecked(false);
      }
    } catch (error) {
      console.error('이메일 중복확인 오류:', error);
      alert('중복확인 중 오류가 발생했습니다.');
      setIsEmailChecked(false);
    }
  };

  // 모든 필수 필드가 입력되었는지 확인
  const isAllRequiredFilled = 
    (isSocialLogin ? 
      (name && phone && birthday) : 
      (userId && password && passwordConfirm && name && phone && birthday && email && selectedEmailDomain && (selectedEmailDomain === "직접입력" ? customDomain : true))
    ) &&
    (isSocialLogin ? 
      (!errors.name && !errors.phone && !errors.birthday) : 
      (!errors.userId && !errors.password && !errors.passwordConfirm && !errors.name && !errors.phone && !errors.birthday && !errors.email && (selectedEmailDomain === "직접입력" ? !errors.customDomain : true))
    );

  // 디버깅용 로그
  console.log('Form validation:', {
    isSocialLogin,
    userId, password, passwordConfirm, name, phone, birthday, email, customDomain, selectedEmailDomain,
    errors: Object.keys(errors),
    isAllRequiredFilled,
    requiredFields: isSocialLogin ? 
      `소셜 로그인: name(${name}), phone(${phone}), birthday(${birthday})` : 
      `일반 회원가입: userId(${userId}), password(${password}), passwordConfirm(${passwordConfirm}), name(${name}), phone(${phone}), birthday(${birthday}), email(${email}), domain(${selectedEmailDomain})`
  });

  // 비밀번호 유효성 검사 (대소문자, 숫자, 특수문자 포함 8자 이상)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 생년월일 상태 변경 감지
  useEffect(() => {
    if (birthYear && birthMonth && birthDay) {
      const formattedBirthday = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
      setValue("birthday", formattedBirthday);
      console.log('Birthday updated via useEffect:', formattedBirthday);
    }
  }, [birthYear, birthMonth, birthDay, setValue]);

  // 이메일 형식 검증 함수
  const validateEmailFormat = (localPart, domain) => {
    if (!localPart || !domain) return false;
    
    // 로컬 파트 검증: 영문, 숫자, 특수문자(._-) 허용, 시작과 끝은 영문/숫자
    const localPartRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$/;
    if (!localPartRegex.test(localPart)) return false;
    
    // 도메인 검증: 영문, 숫자, 하이픈 허용, 시작과 끝은 영문/숫자
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9](\.[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])*$/;
    if (!domainRegex.test(domain)) return false;
    
    // 전체 이메일 형식 검증
    const fullEmail = `${localPart}@${domain}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(fullEmail);
  };

  // 이메일 입력 시 단순히 값만 설정 (실시간 검증 제거)
  const handleEmailInputChange = (field, value) => {
    if (field === 'email') {
      setValue('email', value);
    } else if (field === 'customDomain') {
      setValue('customDomain', value);
    }
  };

  return (
      <form onSubmit={handleSubmit(async (datas) => {
        console.log('폼 데이터:', datas);
        
        // 중복확인 완료 여부 확인 (소셜 로그인은 스킵)
        if (!isUserIdChecked && !isSocialLogin) {
          alert('아이디 중복확인을 완료해주세요.');
          return;
        }
        
        try {
          // 소셜 로그인 사용자의 경우 이메일 정보 가져오기
          let email = null;
          if (isSocialLogin && socialUserData) {
            // 소셜 로그인 사용자는 입력된 이메일을 그대로 사용
            email = datas.email;
            console.log('소셜 로그인 사용자 - 입력된 이메일:', email);
          } else {
            // 일반 회원가입은 분리된 필드에서 조합
            email = datas.email ? `${datas.email}@${selectedEmailDomain === "직접입력" ? datas.customDomain : selectedEmailDomain}` : null;
            console.log('일반 회원가입 사용자 - 조합된 이메일:', email);
            
            // 일반 회원가입 사용자의 경우 이메일 형식 검증
            if (email) {
              const localPart = datas.email;
              const domain = selectedEmailDomain === "직접입력" ? datas.customDomain : selectedEmailDomain;
              
              if (!validateEmailFormat(localPart, domain)) {
                alert('이메일 형식이 올바르지 않습니다.\n\n올바른 형식: example@example.com\n\n- 이메일 앞부분: 영문, 숫자, 특수문자(._-)만 사용 가능\n- 도메인: 영문, 숫자, 하이픈만 사용 가능');
                return;
              }
            }
          }
          
          // 디버깅: 전송할 데이터 확인
          const requestData = {
            user_id: isSocialLogin ? socialUserData.user_id : datas.userId,
            name: datas.name,
            tel: datas.phone,
            birth: datas.birthday,
            email: email,
            type: isSocialLogin ? 'social' : 'regular'  // 단순화: 소셜 로그인은 'social', 일반은 'regular'
          };
          
          console.log('전송할 데이터:', requestData);
          console.log('환경변수 URL:', process.env.REACT_APP_BACKEND_URL);
          
          // 소셜 로그인 사용자와 일반 사용자 구분하여 API 호출
          const apiEndpoint = isSocialLogin ? '/users/social-register' : '/users/register';
          const requestBody = isSocialLogin ? {
            ...requestData,
            isSocialLogin: true,
            provider: socialUserData.provider
          } : {
            ...requestData,
            password: datas.password
          };
          
          console.log('API 엔드포인트:', apiEndpoint);
          console.log('API 요청 데이터:', requestBody);
          console.log('isSocialLogin:', isSocialLogin);
          console.log('socialUserData.provider:', socialUserData?.provider);
          console.log('전달할 provider 값:', socialUserData?.provider);
          
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${apiEndpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('API 응답 오류:', response.status, errorData);
            throw new Error(errorData.message || '회원가입 중 오류가 발생했습니다.');
          }

          const result = await response.json();
          console.log('기본 정보 입력 성공:', result);
          console.log('다음 단계로 이동: /sign-up/profile');

          // 소셜 로그인 사용자의 경우 소셜 로그인 정보도 포함
          if (isSocialLogin && socialUserData) {
            result.tempData.provider = socialUserData.provider;
            result.tempData.accessToken = socialUserData.accessToken;
            result.tempData.user_id = socialUserData.user_id;
            result.tempData.type = 'social';  // 단순화: 모든 소셜 로그인은 'social'
            result.tempData.isSocialLogin = true;
          }

          // 임시 데이터를 localStorage에 저장 (DB 저장 안됨)
          localStorage.setItem('tempUserData', JSON.stringify(result.tempData));
          console.log('tempUserData 저장 완료:', result.tempData);
          
          // 다음 단계로 이동 (프로필 등록)
          console.log('프로필 등록 페이지로 이동 시작...');
          navigate('/sign-up/profile');
          console.log('프로필 등록 페이지로 이동 완료');
        } catch (error) {
          console.error('회원정보 입력 오류:', error);
          alert(error.message);
        }
      })}>
        
        <S.SignUpInfoWrapper>

        {/*아이디 - 소셜 로그인이 아닐 때만 표시*/}
        {!isSocialLogin && (
          <S.SignUpInfoInputWrapper>
            <Text.Body2 fontWeight="600">
              아이디 <RequiredSpan>*</RequiredSpan>
            </Text.Body2>
            <S.InputErrorWrapper>
              <ButtonWithInput
                placeholder="아이디를 입력해주세요."
                buttonText="중복확인"
                variant="default"
                onButtonClick={handleUserIdCheck}
                {...register("userId", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/,
                    message: "영문과 숫자를 포함한 6자리 이상으로 입력해주세요"
                  },
                  onChange: (e) => {
                    // 아이디가 변경되면 중복확인 상태 초기화
                    setIsUserIdChecked(false);
                    setUserIdCheckMessage('');
                  }
                })}
              />
              {userIdCheckMessage && (
                <S.ConfirmMessage style={{ 
                  color: isUserIdChecked ? '#4CAF50' : '#f44336',
                  marginTop: '8px'
                }}>
                  {userIdCheckMessage}
                </S.ConfirmMessage>
              )}
              {errors && errors?.userId?.type === "required" && (
                <S.ConfirmMessage>아이디를 입력해주세요</S.ConfirmMessage>
              )}
              {errors && errors?.userId?.type === "pattern" && (
                <S.ConfirmMessage>영문과 숫자를 포함한 6자리 이상으로 입력해주세요</S.ConfirmMessage>
              )}
            </S.InputErrorWrapper>
          </S.SignUpInfoInputWrapper>
        )}

        {/*비밀번호 - 소셜 로그인이 아닐 때만 표시*/}
        {!isSocialLogin && (
          <>
            <S.SignUpInfoInputWrapper>
              <Text.Body2 fontWeight="600">
                비밀번호 <RequiredSpan>*</RequiredSpan>
              </Text.Body2>
              <S.InputErrorWrapper>
                <PasswordInput 
                  placeholder="비밀번호를 입력해주세요."
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: passwordRegex
                    }
                  })}
                />
                {errors && errors?.password?.type === "required" && (
                  <S.ConfirmMessage>비밀번호를 입력해주세요</S.ConfirmMessage>
                )}
                {errors && errors?.password?.type === "pattern" && (
                  <S.ConfirmMessage>대소문자, 숫자, 특수문자를 포함한 8자 이상으로 입력해주세요.</S.ConfirmMessage>
                )}
              </S.InputErrorWrapper>
            </S.SignUpInfoInputWrapper>

            {/*비밀번호 확인*/}
            <S.SignUpInfoInputWrapper>
              <Text.Body2 fontWeight="600">
                비밀번호 확인<RequiredSpan>*</RequiredSpan>
              </Text.Body2>
              <S.InputErrorWrapper>
                <PasswordInput 
                  placeholder="비밀번호를 다시 입력해주세요."
                  {...register("passwordConfirm", {
                    required: true,
                    validate: {
                      matchPassword: (passwordConfirm) => {
                        const { password } = getValues();
                        return password === passwordConfirm
                      }
                    }
                  })}
                />
                {errors && errors?.passwordConfirm && (
                  <S.ConfirmMessage>비밀번호가 일치하지 않습니다.</S.ConfirmMessage>
                )}
              </S.InputErrorWrapper>
            </S.SignUpInfoInputWrapper>
          </>
        )}

        {/*소셜 로그인 사용자 안내 메시지*/}
        {isSocialLogin && (
          <S.SignUpInfoInputWrapper>
            <div style={{ 
              backgroundColor: '#f0f8ff', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #d1e7ff',
              marginBottom: '20px'
            }}>
              <Text.Body2 style={{ color: '#0066cc', fontWeight: '500' }}>
                🔐 소셜 로그인 회원가입
              </Text.Body2>
              <Text.Body2 style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
                소셜 계정 정보가 자동으로 입력되었습니다. 추가 정보만 입력해주세요.
              </Text.Body2>
            </div>
          </S.SignUpInfoInputWrapper>
        )}

        {/*이름*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            이름<RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <BasicInput 
              type="text" 
              placeholder="이름을 입력해주세요." 
              readOnly={isSocialLogin}
              style={isSocialLogin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
              {...register("name", {
                required: true
              })}
            />
            {errors && errors?.name?.type === "required" && (
              <S.ConfirmMessage>이름을 입력해주세요</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*휴대폰 번호*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            휴대폰 번호<RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <BasicInput 
              type="text" 
              placeholder="휴대폰 번호를 입력해주세요." 
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "하이픈(-)을 제외한 숫자만 입력해주세요"
                }
              })}
            />
            {errors && errors?.phone?.type === "required" && (
              <S.ConfirmMessage>휴대폰 번호를 입력해주세요</S.ConfirmMessage>
            )}
            {errors && errors?.phone?.type === "pattern" && (
              <S.ConfirmMessage>하이픈(-)을 제외한 숫자만 입력해주세요</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*생년월일*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            생년월일<RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <S.BirthdayWrapper>
              <SelectBox
                options={years.map(year => year.toString())}
                placeholder="년도"
                onSelect={(value) => {
                  console.log('Year selected:', value);
                  setBirthYear(value);
                }}
              />
              <SelectBox
                options={months.map(month => month.toString())}
                placeholder="월"
                onSelect={(value) => {
                  console.log('Month selected:', value);
                  setBirthMonth(value);
                }}
              />
              <SelectBox
                options={days.map(day => day.toString())}
                placeholder="일"
                onSelect={(value) => {
                  console.log('Day selected:', value);
                  setBirthDay(value);
                }}
              />
            </S.BirthdayWrapper>
            <input 
              type="hidden" 
              {...register("birthday", { required: true })}
            />
            {errors && errors?.birthday?.type === "required" && (
              <S.ConfirmMessage>생년월일을 입력해주세요</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*이메일*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            이메일<RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.EmailWrapper>
            {isSocialLogin ? (
              // 소셜 로그인 사용자: 전체 이메일 입력
              <BasicInput 
                type="email" 
                placeholder="이메일을 입력해주세요." 
                defaultValue={socialUserData?.email || ''}
                {...register("email", { required: true })}
                style={{ width: '100%' }}
              />
            ) : (
              // 일반 회원가입: 분리된 입력 필드
              <>
                <BasicInput 
                  type="text" 
                  placeholder="이메일을 입력해주세요." 
                  {...register("email", { 
                    required: true,
                    onChange: (e) => handleEmailInputChange('email', e.target.value)
                  })}
                />
                <Text.Button2>@</Text.Button2>    
                <SelectBox
                  options={["gmail.com", "naver.com", "daum.net", "nate.com" , "직접입력"]}
                  placeholder="선택하세요."
                  onSelect={handleEmailDomainSelect}
                />
                {showCustomDomain && (
                  <BasicInput 
                    type="text" 
                    placeholder="도메인을 입력해주세요." 
                    {...register("customDomain", { 
                      required: true,
                      onChange: (e) => handleEmailInputChange('customDomain', e.target.value)
                    })}
                  />
                )}
              </>
            )}
          </S.EmailWrapper>
          {errors && errors?.email?.type === "required" && (
            <S.ConfirmMessage>이메일을 입력해주세요</S.ConfirmMessage>
          )}
          {!isSocialLogin && showCustomDomain && errors && errors?.customDomain?.type === "required" && (
            <S.ConfirmMessage>도메인을 입력해주세요</S.ConfirmMessage>
          )}
        </S.SignUpInfoInputWrapper>

        <S.ConfirmButtonWrapper>
          <BasicButton 
            variant={isAllRequiredFilled ? "filled" : "disabled"} 
            basicButton="medium" 
            size="large"
            disabled={!isAllRequiredFilled || isSubmitting}
            type="submit"
          >
            확인
          </BasicButton>
        </S.ConfirmButtonWrapper>
        </S.SignUpInfoWrapper>
      </form>
  );
};

export default SignUpInfo;