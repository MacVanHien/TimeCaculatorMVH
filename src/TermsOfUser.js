import React, { useState } from 'react'
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height



const TermsOfUser = ({ route, navigation }) => {
    const [isVietnamese, setIsVietnamese] = useState('flex')
    const [isEnglish, setIsEnglish] = useState('none')



    return (
        <View>
            <View style={{ backgroundColor: '#fffff0', height: HEIGHT * 1, width: WIDTH * 1 }}>
                <View style={{ height: hp('5.5%'), backgroundColor: '#E6E6FA', zIndex: 9, justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={{ height: hp('3.5%'), width: wp('100%'), borderRadius: 20, margin: 7, justifyContent: 'center', }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                allowFontScaling={false}
                                source={require('./imges/BackButton_rbg1.png')}
                                style={{ width: wp('4%'), height: wp('5%'), borderRadius: 50, backgroundColor: 'rgba(250, 250, 250)', tintColor: 'blue', }}
                                resizeMode='stretch'
                            />
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{
                                    paddingLeft: 0, fontSize: hp('2.2%'), color: '#ccc',
                                }}>
                                {` Time Calculator `}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setIsVietnamese(isVietnamese == 'flex' ? 'none' : 'flex');
                            setIsEnglish(isEnglish == 'flex' ? 'none' : 'flex');
                        }}
                        style={{
                            borderWidth: 1, borderColor: '#fff', backgroundColor: '#fff', opacity: 0.9, width: hp('7%'), borderRadius: 20, margin: 7,
                            textAlign: 'center', justifyContent: 'center', position: 'absolute', top: 0, right: 10, zIndex: 100, elevation: 5,
                        }}
                    >
                        {isEnglish == 'flex' &&
                            <Text allowFontScaling={false} style={{ fontSize: hp('2.2%'), color: '#00f', paddingLeft: hp('2.2%'), }}>
                                Vi
                            </Text>
                        }
                        {isVietnamese == 'flex' &&
                            <Text allowFontScaling={false} style={{ fontSize: hp('2.2%'), color: '#00f', paddingLeft: hp('2.2%'), }}>
                                En
                            </Text>
                        }
                    </TouchableOpacity>
                </View>

                {/* Để lộ phần video (background trong suốt) và hiển thị câu dưới background, khi 
                    đến thời gian câu phát trong video thì nhấp nháy 1s */}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 18, color: '#333' }}>
                    Điều khoản sử dụng
                    </Text>
                    <View style = {{marginHorizontal: 38, marginTop: 22}}>
                    <Text style = {{marginTop: 12, fontSize: 15}}>
                        1. App lưu tất cả thông tin trên firebase , một nơi lưu trữ dữ liệu miễn phí của Google.
                    </Text>
                    <Text style = {{marginTop: 12, fontSize: 15}}>
                        2. Thông tin của người dùng App được lưu trên firebase, được sử dụng để cập nhập cho người dùng, và hiển thị một số thông tin trên App của người dùng khác. App không có hành động trục lợi khác.
                    </Text>
                    <Text 
                        style = {{marginTop: 12, fontSize: 15}}
                        selectable={true}
                    >
                        3. Người dùng chú ý bảo vệ tài khoản, và thông tin của mình. Khi bị mất tài khoản nếu cần lấy lại hoặc thực hiện hành động khác với tài khoản thì liên hệ admin qua gmail "macvanhien10@gmail.com" để lấy lại thông tin tài khoản.
                    </Text>
                    </View> */}

                    <ScrollView style={{ display: isEnglish }}>
                        <Text
                            allowFontScaling={false}
                            style={{ width: WIDTH, fontSize: hp('2%'), paddingLeft: 38, paddingRight: 22, paddingTop: 62, fontWeight: 'bold', color: '#333', }}>PRIVACY POLICY</Text>
                        <Text
                            allowFontScaling={false}
                            style={{ width: WIDTH, fontSize: hp('2%'), paddingLeft: 38, paddingRight: 22, paddingBottom: 120, paddingTop: 10, color: '#333', }}
                            selectable={true}
                        >{`                                    
        Developer built the Time calculator app as free app contains ads . This SERVICE is provided by Developer [at no cost] and is intended for use as is.
        
        This page is used to inform visitors regarding [my/our] policies with the collection, use, and disclosure of Personal Information if anyone decided to use [my/our] Service.
        
        If you choose to use [my/our] Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that [I/We] collect is used for providing and improving the Service. [I/We] will not use or share your information with anyone except as described in this Privacy Policy.
        
        The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Time calculator unless otherwise defined in this Privacy Policy.
        
        
        Information Collection and Use

        For a better experience, while using our Service, [I/We] may require you to provide us with certain personally identifiable information[e.g. users name, address, location, pictures] The information that [I/We] request will be [retained on Firebase - a cloud database service provided by Google and is not collected by [me/us] in any way]/[retained by us and used as described in this privacy policy].
        
        The app does use third-party services that may collect information used to identify you.
        

        Link to the privacy policy of third-party service providers used by the app

        AdMob

        Log Data
        
        [I/We] want to inform you that whenever you use [my/our] Service, in a case of an error in the app [I/We] collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing [my/our] Service, the time and date of your use of the Service, and other statistics.
        
        Cookies
        
        Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
        
        This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
        
        
        Service Providers
        
        [I/We] may employ third-party companies and individuals due to the following reasons:
        
        -  To facilitate our Service;
        -  To provide the Service on our behalf;
        -  To perform Service-related services; or
        -  To assist us in analyzing how our Service is used.

        [I/We] want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
        

        Security
        
        [I/We] value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and [I/We] cannot guarantee its absolute security.
        

        Links to Other Sites
        
        This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by [me/us]. Therefore, [I/We] strongly advise you to review the Privacy Policy of these websites. [I/We] have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        

        Children’s Privacy
        
        These Services do not address anyone under the age of 13. [I/We] do not knowingly collect personally identifiable information from children under 13 years of age. In the case [I/We] discover that a child under 13 has provided [me/us] with personal information, [I/We] immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact [me/us] so that [I/We] will be able to do the necessary actions.
        

        Changes to This Privacy Policy
        
        [I/We] may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. [I/We] will notify you of any changes by posting the new Privacy Policy on this page.
        

        This policy is effective as of 2022-11-08

        
        Contact Us
        
        If you have any questions or suggestions about [my/our] Privacy Policy, do not hesitate to contact [me/us] at macvanhien10@gmail.com.
        
        This privacy policy page was created at privacypolicytemplate.net and modified/generated by App Privacy Policy Generator
                `}</Text>
                    </ScrollView>

                    <ScrollView style={{ display: isVietnamese }}>
                        <Text
                            allowFontScaling={false}
                            style={{ width: WIDTH, fontSize: hp('2.2%'), paddingLeft: 38, paddingRight: 22, paddingTop: 62, fontWeight: 'bold', color: '#333', }}>CHÍNH SÁCH BẢO MẬT</Text>
                        <Text
                            allowFontScaling={false}
                            style={{ width: WIDTH, fontSize: hp('2.2%'), paddingLeft: 38, paddingRight: 22, paddingBottom: 120, paddingTop: 10, color: '#333', }}
                            selectable={true}
                        >{`                                    
        Nhà phát triển đã xây dựng ứng dụng Time calculator dưới dạng ứng dụng miễn phí có chứa quảng cáo. DỊCH VỤ này do Nhà phát triển cung cấp [miễn phí] và được thiết kế để sử dụng như hiện tại.        
        
        Trang này được sử dụng để thông báo cho khách truy cập về các chính sách của [của tôi / của chúng tôi] với việc thu thập, sử dụng và tiết lộ Thông tin Cá nhân nếu bất kỳ ai quyết định sử dụng Dịch vụ của [tôi / của chúng tôi].        
        
        Nếu bạn chọn sử dụng Dịch vụ [của tôi / của chúng tôi], nghĩa là bạn đồng ý với việc thu thập và sử dụng thông tin liên quan đến chính sách này. Thông tin Cá nhân mà [Tôi / Chúng tôi] thu thập được sử dụng để cung cấp và cải thiện Dịch vụ. [Tôi / Chúng tôi] sẽ không sử dụng hoặc chia sẻ thông tin của bạn với bất kỳ ai ngoại trừ được mô tả trong Chính sách Bảo mật này.

        Các điều khoản được sử dụng trong Chính sách Bảo mật này có ý nghĩa tương tự như trong Điều khoản và Điều kiện của chúng tôi, có thể truy cập được tại Time calculator trừ khi được định nghĩa khác trong Chính sách Bảo mật này.

        
        Thu thập và sử dụng thông tin

        Để có trải nghiệm tốt hơn, khi sử dụng Dịch vụ của chúng tôi, [Tôi / Chúng tôi] có thể yêu cầu bạn cung cấp cho chúng tôi một số thông tin nhận dạng cá nhân nhất định [ví dụ: tên người dùng, địa chỉ, vị trí, hình ảnh] Thông tin mà [Tôi / Chúng tôi] yêu cầu sẽ được [lưu giữ trên Firebase - một dịch vụ cơ sở dữ liệu đám mây do Google cung cấp và không được [tôi / chúng tôi] thu thập dưới bất kỳ hình thức nào] / [được lưu giữ bởi chúng tôi và được sử dụng như được mô tả trong chính sách bảo mật này].

        Ứng dụng sử dụng các dịch vụ của bên thứ ba có thể thu thập thông tin được sử dụng để nhận dạng bạn.


        Liên kết đến chính sách bảo mật của các nhà cung cấp dịch vụ bên thứ ba được ứng dụng sử dụng

        AdMob

        Dữ liệu nhật ký

        [Tôi / Chúng tôi] muốn thông báo với bạn rằng bất cứ khi nào bạn sử dụng Dịch vụ [của tôi / của chúng tôi], trong trường hợp xảy ra lỗi trong ứng dụng [Tôi / Chúng tôi] thu thập dữ liệu và thông tin (thông qua các sản phẩm của bên thứ ba) trên điện thoại của bạn có tên là Nhật ký Dữ liệu. Dữ liệu nhật ký này có thể bao gồm thông tin như địa chỉ Giao thức Internet (“IP”) trên thiết bị của bạn, tên thiết bị, phiên bản hệ điều hành, cấu hình của ứng dụng khi sử dụng Dịch vụ [của tôi / của chúng tôi], ngày và giờ bạn sử dụng Dịch vụ và các số liệu thống kê khác.

        Cookies
        
        Cookie là các tệp có một lượng nhỏ dữ liệu thường được sử dụng làm mã nhận dạng duy nhất ẩn danh. Chúng được gửi đến trình duyệt của bạn từ các trang web mà bạn truy cập và được lưu trữ trên bộ nhớ trong của thiết bị của bạn.

        Dịch vụ này không sử dụng các “cookie” này một cách rõ ràng. Tuy nhiên, ứng dụng có thể sử dụng mã và thư viện của bên thứ ba sử dụng “cookie” để thu thập thông tin và cải thiện dịch vụ của họ. Bạn có tùy chọn chấp nhận hoặc từ chối các cookie này và biết khi nào một cookie được gửi đến thiết bị của bạn. Nếu bạn chọn từ chối cookie của chúng tôi, bạn có thể không sử dụng được một số phần của Dịch vụ này.


        Các nhà cung cấp dịch vụ

        [Tôi / Chúng tôi] có thể tuyển dụng các công ty và cá nhân bên thứ ba vì những lý do sau:
                
        -	Để tạo điều kiện cho Dịch vụ của chúng tôi;
        -	Để cung cấp Dịch vụ thay mặt chúng tôi;
        -	Để thực hiện các dịch vụ liên quan đến Dịch vụ; hoặc
        -	Để hỗ trợ chúng tôi phân tích cách Dịch vụ của chúng tôi được sử dụng.

        [Tôi / Chúng tôi] muốn thông báo cho người dùng Dịch vụ này rằng các bên thứ ba này có quyền truy cập vào Thông tin cá nhân của họ. Lý do là để thay mặt chúng tôi thực hiện các nhiệm vụ được giao cho họ. Tuy nhiên, họ có nghĩa vụ không tiết lộ hoặc sử dụng thông tin cho bất kỳ mục đích nào khác.        
                

        Bảo vệ
        
        [Tôi / Chúng tôi] đánh giá cao sự tin tưởng của bạn trong việc cung cấp cho chúng tôi Thông tin cá nhân của bạn, do đó chúng tôi đang cố gắng sử dụng các phương tiện được chấp nhận về mặt thương mại để bảo vệ thông tin đó. Nhưng hãy nhớ rằng không có phương thức truyền tải nào qua internet hoặc phương thức lưu trữ điện tử là an toàn và đáng tin cậy 100% và [Tôi / Chúng tôi] không thể đảm bảo tính bảo mật tuyệt đối của nó.


        Liên kết đến các trang web khác

        Dịch vụ này có thể chứa các liên kết đến các trang web khác. Nếu bạn nhấp vào liên kết của bên thứ ba, bạn sẽ được dẫn đến trang web đó. Lưu ý rằng các trang web bên ngoài này không do [tôi / chúng tôi] điều hành. Do đó, [Tôi / Chúng tôi] thực sự khuyên bạn nên xem lại Chính sách Bảo mật của các trang web này. [Tôi / Chúng tôi] không kiểm soát và không chịu trách nhiệm về nội dung, chính sách bảo mật hoặc thực tiễn của bất kỳ trang web hoặc dịch vụ của bên thứ ba nào.


        Quyền riêng tư của trẻ em

        Những Dịch vụ này không liên quan đến bất kỳ ai dưới 13 tuổi [Tôi / Chúng tôi] không cố ý thu thập thông tin nhận dạng cá nhân từ trẻ em dưới 13 tuổi. Trong trường hợp [Tôi / Chúng tôi] phát hiện ra rằng một đứa trẻ dưới 13 tuổi đã cung cấp cho [tôi / chúng tôi] thông tin cá nhân, [Tôi / Chúng tôi] ngay lập tức xóa thông tin này khỏi máy chủ của chúng tôi. Nếu bạn là cha mẹ hoặc người giám hộ và bạn biết rằng con bạn đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ với [tôi / chúng tôi] để [Tôi / Chúng tôi] có thể thực hiện các hành động cần thiết.
        
        
        Những thay đổi đối với Chính sách Bảo mật này

        [Tôi / Chúng tôi] có thể cập nhật Chính sách Bảo mật của chúng tôi theo thời gian. Vì vậy, bạn nên xem lại trang này định kỳ để biết bất kỳ thay đổi nào. [Tôi / Chúng tôi] sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính sách Bảo mật mới trên trang này.
        
        
        Chính sách này có hiệu lực từ 2022-11-08
        

        Liên hệ chúng tôi  

        Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào về Chính sách Bảo mật của [tôi / của chúng tôi], vui lòng liên hệ với [tôi / chúng tôi] qua email macvanhien10@gmail.com.

        Trang chính sách bảo mật này được tạo tại privacypolicytemplate.net và được sửa đổi / tạo bởi App Privacy Policy Generator                `}</Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default TermsOfUser