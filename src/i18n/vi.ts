import {Translations} from './en';

const vi: Translations = {
  common: {
    ok: 'OK',
    cancel: 'Cancelar',
    back: 'Quay lại',
    logOut: 'Đăng xuất',
  },
  welcomeScreen: {
    postscript:
      'psst — Đây có thể không phải là giao diện của ứng dụng của bạn. (Trừ khi bạn thiết kế đã gửi cho bạn các màn hình này, và trong trường hợp đó, hãy đưa chúng ra sản phẩm!)',
    readyForLaunch: 'Ứng dụng của bạn, gần như sẵn sàng cho việc ra mắt!',
    exciting: '(ohh, điều này thú vị!)',
    letsGo: 'Goooo!',
  },
  errorScreen: {
    title: 'Đã xảy ra lỗi!',
    friendlySubtitle:
      'Đây là màn hình mà người dùng của bạn sẽ thấy trong sản phẩm khi có lỗi. Bạn sẽ muốn tùy chỉnh thông báo này (nằm trong `app/i18n/es.ts`) và có thể cả thiết kế (`app/screens/ErrorScreen`). Nếu bạn muốn loại bỏ nó hoàn toàn, kiểm tra `app/app.tsx` và thành phần <ErrorBoundary>.',
    reset: 'Khởi động lại ứng dụng',
    traceTitle: 'Lỗi từ %{name}',
  },
  emptyStateComponent: {
    generic: {
      heading: 'Chưa có dữ liệu',
      content:
        'Không tìm thấy dữ liệu tạm thời. Hãy thử nhấp vào nút để tải lại hoặc tải lại ứng dụng.',
      button: 'Hãy thử lại',
    },
  },
  errors: {
    invalidEmail: 'Email không hợp lệ.',
  },
  loginScreen: {
    logIn: 'Đăng nhập',
    enterDetails:
      'Nhập thông tin của bạn dưới đây để mở khóa thông tin siêu bí mật. Bạn sẽ không bao giờ đoán được những gì đang chờ bạn ở phía bên kia. Hoặc có thể là bạn sẽ đoán được; thực tế là không có nhiều khoa học ở đây.',
    emailFieldLabel: 'Email',
    passwordFieldLabel: 'Mật khẩu',
    emailFieldPlaceholder: 'Nhập email của bạn',
    passwordFieldPlaceholder: 'Mật khẩu siêu bí mật ở đây',
    tapToLogIn: 'Nhấp vào đây để đăng nhập!',
    hint: 'Mẹo: bạn có thể sử dụng bất kỳ email nào và mật khẩu ưa thích của bạn :)',
  },
};

export default vi;
