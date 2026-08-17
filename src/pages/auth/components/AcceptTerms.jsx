import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RadioWithLabel from '../../../components/radio/RadioWithLabel';
import S from '../style';
import Text from '../../../components/text/size';
import CheckboxWithLabel from '../../../components/checkbox/CheckboxWithLabel';
import BasicButton from '../../../components/button/BasicButton';
import PopupCardLarge from '../../../components/popUp/PopupCardLarge';
import { useCheckGroup } from '../../../hooks/useCheckGroup';
import SocialTabWrapper from './SocialTabWrapper';

// 이용약관 동의 페이지
const AcceptTerms = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [showAlert, setShowAlert] = useState(false);
    
    // 소셜 로그인 사용자 정보 확인
    useEffect(() => {
        console.log('=== AcceptTerms useEffect 실행 ===');
        const accessToken = searchParams.get('accessToken');
        const isNewUser = searchParams.get('isNewUser');
        const userId = searchParams.get('user_id');
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const provider = searchParams.get('provider'); // type 대신 provider 사용
        const type = searchParams.get('type'); // 기존 type도 유지 (호환성)

        console.log('AcceptTerms URL 파라미터:', { accessToken, isNewUser, userId, name, email, provider, type });

        // 소셜 로그인 사용자인 경우 (URL 파라미터가 있는 경우만)
        if ((isNewUser === 'true' && accessToken && userId) || 
            (accessToken && userId && name && email)) {
            console.log('소셜 로그인 사용자 감지 - 사용자 정보 저장');
            
            // 소셜 로그인 사용자 정보를 localStorage에 저장
            const socialData = {
                accessToken: accessToken,
                email: decodeURIComponent(email || ''),
                name: decodeURIComponent(name || ''),
                provider: provider || type || 'google', // provider 우선, 없으면 type 사용
                type: 'social', // 모든 소셜 로그인은 'social'로 통일
                user_id: userId
            };
            
            console.log('localStorage에 저장할 소셜 데이터:', socialData);
            localStorage.setItem('socialUserData', JSON.stringify(socialData));
            
            // 저장 확인
            const savedData = localStorage.getItem('socialUserData');
            console.log('localStorage 저장 확인:', savedData);
        } else {
            // URL 파라미터가 없으면 일반 회원가입으로 간주
            console.log('일반 회원가입 감지 - 소셜 로그인 데이터 완전 정리 및 일반 회원가입 플로우 시작');
            
            // 기존 소셜 로그인 데이터가 있으면 완전히 정리
            const existingSocialData = localStorage.getItem('socialUserData');
            if (existingSocialData) {
                console.log('기존 소셜 로그인 데이터 발견 - 일반 회원가입을 위해 완전 정리');
                localStorage.removeItem('socialUserData');
                console.log('socialUserData 삭제 완료');
            }
            
            // 기존 일반 회원가입 플래그도 정리
            localStorage.removeItem('isRegularSignup');
            
            // 일반 회원가입 플래그 새로 설정
            localStorage.setItem('isRegularSignup', 'true');
            console.log('일반 회원가입 플래그 설정 완료 - 깨끗한 상태로 시작');
        }
        
        // 페이지 로드 시 localStorage 상태 로깅
        console.log('AcceptTerms 페이지 로드 후 localStorage 상태:');
        console.log('- socialUserData:', localStorage.getItem('socialUserData'));
        console.log('- isRegularSignup:', localStorage.getItem('isRegularSignup'));
    }, [searchParams]);
    
    // 필수 약관 동의 그룹 (useCheckGroup 활용)
    const {
        checks: termsChecks,
        allChecked: allTermsChecked,
        setAll: setAllTerms,
        setOne: setOneTerm
    } = useCheckGroup(["terms", "privacy"]);

    // 마케팅 동의 그룹 (useCheckGroup 활용)
    const {
        checks: marketingChecks,
        allChecked: allMarketingChecked,
        setAll: setAllMarketing,
        setOne: setOneMarketing
    } = useCheckGroup(["sms", "email", "push"]);

    // 확인 버튼 클릭 시 처리
    const handleConfirm = () => {
        if (allTermsChecked) {
            navigate('/sign-up/info');
        } else {
            setShowAlert(true);
        }
    };

    // 알럿 닫기
    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <>
            <S.AllAgreeWrapper>
                {/* 전체 동의: 모든 필수 약관이 체크되면 true, 아니면 false */}
                <RadioWithLabel
                    size="L"
                    label="약관 전체 동의"
                    checked={allTermsChecked}
                    onChange={() => setAllTerms(!allTermsChecked)}
                />
            </S.AllAgreeWrapper>

            <S.TermsWrapper>
                <S.TermsBoxWrapper>
                    <RadioWithLabel
                        size="M"
                        label={<><S.RequiredText>(필수)</S.RequiredText> 홈페이지 이용약관 *</>}
                        checked={termsChecks.terms}
                        onChange={() => setOneTerm("terms", !termsChecks.terms)}
                    />
                    <S.TermsBox>
                        <Text.Body3 fontWeight="700" mb="20">제 1장 (총 칙)</Text.Body3>
                        <S.TermsTextBox>
                            <S.TermsTitle>제 1조 (목적)</S.TermsTitle>
                            <S.TermsText>이 약관은 [회사명]이 운영하는 웹사이트(이하 "서비스")에서 제공하는 모든 서비스의 이용조건 및 절차, 회원과 회사 간의 권리와 의무, 
                            기타 필요한 사항을 규정함을 목적으로 합니다.</S.TermsText>
                        </S.TermsTextBox>

                        <S.TermsTextBox mt="40">
                            <S.TermsTitle>제2조 (약관의 효력 및 변경)</S.TermsTitle>
                            <S.TermsListDemical>
                                <S.TermsListDemicalItem>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.</S.TermsListDemicalItem>
                                <S.TermsListDemicalItem>회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력이 발생합니다.</S.TermsListDemicalItem>
                            </S.TermsListDemical>
                        </S.TermsTextBox>
                    </S.TermsBox>
                </S.TermsBoxWrapper>

                <S.TermsBoxWrapper>
                    <RadioWithLabel
                        size="M"
                        label={<><S.RequiredText>(필수)</S.RequiredText> 개인정보 수집 및 이용 동의 *</>}
                        checked={termsChecks.privacy}
                        onChange={() => setOneTerm("privacy", !termsChecks.privacy)}
                    />
                    <S.TermsBox>
                        <S.TermsTextBox>
                            <S.TermsTitle>제 1조 (항목)</S.TermsTitle>
                            <S.TermsList>
                                <S.TermsListItem>당사는 귀하의 이름, 성, 우편주소, 배송지 주소, 전화번호, 이메일 주소 및 기타 유사한 정보를 포함한 개인 연락처 정보 또는 사업 연락처 정보를 수집할 수 있습니다.</S.TermsListItem>
                                <S.TermsListItem>온라인 구매를 하는 경우, 귀하는 귀하가 선택하는 결제 형태에 따라 신용/직불카드 번호 및 관련 금융정보(유효기간, 보안코드, 청구지 주소 등) 또는 기타 결제 방식(MungPick 카드 등 포함 결제 등)에 대한 정보를 제공해야 합니다.</S.TermsListItem>
                                <S.TermsListItem>당사는 귀하가 계정을 생성하거나, 온라인 서비스에 접속하거나, 당사 제품을 구매할 때 귀하의 사용자명 및 비밀번호 등의 정보를 수집합니다. 계정 정보는 또한 귀하가 MungPick 서비스를 구매하거나가입한 범위, 귀하의 거래, 귀하가 이용하는 MungPick 서비스에 대한 청구 및 지원 내역, 귀하가 생성한 계정과 관련된 기타 사항을 포함할 수 있습니다.</S.TermsListItem>
                                <S.TermsListItem>이용 정보, 이용 정보는 귀하의 MungPick 서비스 이용 시 당사와 귀하와 관련하여 수집하는 개인정보이며, 여기에는 귀하의 로그인 일시, 귀하의 제3자 애플리케이션에서 이용 내역 및 귀하가 수집하는 광고 내역에 관한 정보가 포함될 수 있습니다.</S.TermsListItem>
                                <S.TermsListItem>당사는 귀하의 MungPick 계정 인증 및 결제에 필요한 사용자 ID, 비밀번호, 이메일 외의 유사한 보안 정보를 수집합니다.</S.TermsListItem>
                                <S.TermsListItem>소셜 미디어를 통한 정보. 귀하는 MungPick서비스를 통하여 귀하의 페이스북 또는 기타 소셜 미디어 계정에 연결할 수 있습니다. 귀하가 이러한 기능들을 사용하는 경우, 귀하에 관한 정보가 수집 또는 공유될 수 있습니다. 예를 들어 해당 기능들은 귀하의 IP 주소, 귀하가 당사 사이트에서 방문하는 페이지에 대한 정보를 수집할 수 있으며, 기능이 제대로 작동할 수 있도록 쿠키를 설정할 수 있습니다. 해당 기능들은 또한 제3자 소셜 미디어 서비스들이 당사에 귀하의 성명, 이메일 주소 및 기타 연락처 정보 등 귀하에 관한 정보를 제공하는 것을 허용할 수 있습니다. 당사가 제공받는 정보는 귀하의 소셜 네트워크상 개인정보 설정에 따라 달라집니다. 귀하가 이용하는 소셜 미디어 사이트에서 수집, 이용 및 공유되는 정보를 이해하기 위해서는 해당 사이트의 개인정보 처리방침 및 설정을 검토하시기 바랍니다.</S.TermsListItem>
                                <S.TermsListItem>고객 서비스, 설문조사 및 프로모션. 당사는 (i) 귀하가 온라인, 전화 또는 우편으로 당사 고객 지원 채널과 소통할 때, (ii) 귀하가 당사의 고객 설문조사 또는 프로모션에 참여할 때, (iii) MungPick 서비스의 원활한 제공을 위해 또는 (iv) 귀하의 문의에 답변하기 위하여 귀하의 추가적인 개인정보를 수집할 수 있습니다. 추가 개인정보의 종류에는 음성 녹음, 사진 및 영상이 포함될 수 있습니다.</S.TermsListItem>
                                <S.TermsListItem>기기 및 기술 데이터. 당사는 귀하가 당사의 웹사이트를 방문하거나 당사의 모바일 애플리케이션 또는 서비스를 이용할 때 기술정보를 수집합니다. 여기에는 귀하의 IP 주소, 귀하의 로그인 정보, 귀하가 사용하는 모바일 기기 유형, 귀하의 기기 운영체제 및 브라우저 유형, 시간대 설정 및 위치, 언어, 고유 기기 식별자, 참조 웹사이트 주소, 당사 웹사이트를 통해 귀하가 이용하는 경로 및 기타 당사 웹사이트 내 귀하의 세션에 관한 정보가 포함됩니다.</S.TermsListItem>
                            </S.TermsList>
                        </S.TermsTextBox>
                    </S.TermsBox>
                </S.TermsBoxWrapper>

                <S.TermsBoxWrapper>
                    {/* 마케팅 전체 동의: 모든 마케팅 체크가 true면 true, 아니면 false */}
                    <CheckboxWithLabel
                        label="마케팅 전체 동의"
                        checked={allMarketingChecked}
                        onChange={() => setAllMarketing(!allMarketingChecked)}
                    />
                    <S.TermsBox>
                        <S.TermsTextBox>
                            <S.TermsList>
                                <S.TermsListItem>등록하신 휴대폰번호, 이메일 정보와 APP 알림 받기 설정으로 이벤트 소식, 할인 정보, 서비스 안내등을 받을수 있습니다.</S.TermsListItem>
                                <S.TermsListItem>이용 목적 : 새로운 서비스 및 이벤트 정보등의 안내</S.TermsListItem>
                            </S.TermsList>
                        </S.TermsTextBox>
                    </S.TermsBox>
                    <S.CheckboxWrapper>
                        <CheckboxWithLabel
                            label="SMS / LMS / MMS 수신 동의"
                            checked={marketingChecks.sms}
                            onChange={() => setOneMarketing("sms", !marketingChecks.sms)}
                        />
                        <CheckboxWithLabel
                            label="E-mail 수신 동의"
                            checked={marketingChecks.email}
                            onChange={() => setOneMarketing("email", !marketingChecks.email)}
                        />
                        <CheckboxWithLabel
                            label="알림톡 수신 동의"
                            checked={marketingChecks.push}
                            onChange={() => setOneMarketing("push", !marketingChecks.push)}
                        />
                    </S.CheckboxWrapper>
                </S.TermsBoxWrapper>
            </S.TermsWrapper>


            <S.NoticeWrapper>
                <img src="/assets/icons/notice.png" width={100} height={100} alt="공지" />
                <S.NoticeText>
                    <S.NoticeTextTitle>
                        만 14세 이상 고객만 가입이 가능합니다.
                    </S.NoticeTextTitle>
                    <Text.Body3 mt="20">
                        MungPick 은 만 14세 미만 아동의 회원가입을 제한하고 있습니다.<br/>
                        「정보통신망 이용촉진 및 정보보호 등에 관한 법률에는 만 14세 미만 아동의 개인정보 수집 시 법정대리인 동의를 받도록 규정하고 있으며, <br/>
                        만 14세 미만 아동의 법정대리인 동의없이 회원가입을 하는 경우 회원탈퇴 또는 서비스 이용이 제한될 수 있습니다.」
                    </Text.Body3>
                </S.NoticeText>
            </S.NoticeWrapper>   


            <S.TermsButtonWrapper>
                <BasicButton 
                    basicButton="medium" 
                    variant="filled"
                    onClick={handleConfirm}
                >
                    확인
                </BasicButton>
            </S.TermsButtonWrapper>

            {/* 알럿 팝업 */}
            {showAlert && (
                <PopupCardLarge
                    title="약관 동의 필요"
                    description="필수 약관에 동의해주세요."
                    actions={[
                        {
                            label: "확인",
                            onClick: handleCloseAlert,
                            type: "filled"
                        }
                    ]}
                    onClose={handleCloseAlert}
                />
            )}
        </>



    );
};

export default AcceptTerms;