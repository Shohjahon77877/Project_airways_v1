import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateAdminDto,
  CreateNewsDto,
  CreateFlightDto,
  UpdateAdminDto,
  UpdateFlightDto,
  UpdateNewsDto,
  CreateAirportDto,
  UpdateAirportDto,
  CreateCityDto,
  UpdateCityDto,
  CreateCountryDto,
  UpdateCountryDto,
  CreateCompanyDto,
  UpdateCompanyDto,
  CreatePlaneDto,
  UpdatePlaneDto,
  CreateClassDto,
  UpdateClassDto,
  CreateSeatDto,
  UpdateSeatDto,
  CreateUserDto,
  UpdateUserDto,
  UpdateLoyaltyProgramDto,
  CreateLoyaltyProgramDto,
  UpdateTicketDto,
  CreateTicketDto,
} from '@my-airways/shared-dto-v2';
import { AuthGuard, RoleGuard } from '@my-airways/shared-services-v2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // Auth
  @Post('login/admin')
  loginAdmin(@Body() credentials: { input_email: string; password: string }) {
    return this.appService.loginAdmin(credentials);
  }

  @Post('login/user')
  loginUser(@Body() credentials: { input_email: string; password: string }) {
    return this.appService.loginUser(credentials);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.appService.registerUser(dto);
  }

  @Post('refresh/:id')
  refresh(@Param('id') id: number) {
    return this.appService.refreshToken(id);
  }

  @Post('logout/:id')
  logout(@Param('id') id: number) {
    return this.appService.logout(id);
  }

  // ====================================================
  // ==================== ADMINS ========================
  // ====================================================
  @Post('admin')
  @UseGuards(AuthGuard, RoleGuard)
  createAdmin(@Body() admin: CreateAdminDto) {
    return this.appService.createAdmin(admin);
  }

  @Get('admin')
  @UseGuards(AuthGuard)
  getAdmins() {
    return this.appService.getAdmins();
  }

  @Get('admin/:id')
  @UseGuards(AuthGuard)
  getAdminById(@Param('id') id: string) {
    return this.appService.getAdminById(+id);
  }

  @Patch('admin/:id')
  @UseGuards(AuthGuard, RoleGuard)
  updateAdmin(@Param('id') id: string, @Body() data: UpdateAdminDto) {
    return this.appService.updateAdmin(+id, data);
  }

  @Delete('admin/:id')
  @UseGuards(AuthGuard, RoleGuard)
  deleteAdmin(@Param('id') id: string) {
    return this.appService.deleteAdmin(+id);
  }

  // ====================================================
  // ==================== USERS ========================
  // ====================================================

  @Post('user')
  @UseGuards(AuthGuard, RoleGuard)
  createUser(@Body() user: CreateUserDto) {
    return this.appService.createUser(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getUsers(@Req() req: Request) {
    return this.appService.getUsers();
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(+id);
  }

  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.appService.updateUser(+id, data);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(+id);
  }

  //===========================================================================
  //----FLight Service---------------------------------------------------------
  @Get('flight')
  getFlights() {
    return this.appService.getFlights();
  }

  @Get('flight/:id')
  getFlightById(@Param('id') id: string) {
    return this.appService.getFlightById(+id);
  }

  @Post('flight')
  @UseGuards(AuthGuard)
  createFlight(@Body() flight: CreateFlightDto) {
    return this.appService.createFlight(flight);
  }

  @Patch('flight/:id')
  @UseGuards(AuthGuard)
  updateFlight(@Param('id') id: string, @Body() data: UpdateFlightDto) {
    return this.appService.updateFlight(+id, data);
  }

  @Delete('flight/:id')
  @UseGuards(AuthGuard)
  deleteFlight(@Param('id') id: string) {
    return this.appService.deleteFlight(+id);
  }

  //===========================================================================
  //----News Service-----------------------------------------------------------
  @Get('news')
  getNews() {
    return this.appService.getNews();
  }

  @Get('news/:id')
  getNewsById(@Param('id') id: string) {
    return this.appService.getNewsById(+id);
  }

  @Post('news')
  @UseGuards(AuthGuard)
  createNews(@Body() news: CreateNewsDto) {
    return this.appService.createNews(news);
  }

  @Patch('news/:id')
  @UseGuards(AuthGuard)
  updateNews(@Param('id') id: string, @Body() data: UpdateNewsDto) {
    return this.appService.updateNews(+id, data);
  }

  @Delete('news/:id')
  @UseGuards(AuthGuard)
  deleteNews(@Param('id') id: string) {
    return this.appService.deleteNews(+id);
  }

  //===========================================================================
  //----Ticket Service---------------------------------------------------------
  @Post('ticket')
  @UseGuards(AuthGuard, RoleGuard)
  createTicket(@Body() ticket: CreateTicketDto) {
    return this.appService.createTicket(ticket);
  }

  @Get('ticket')
  @UseGuards(AuthGuard)
  getTicket(@Req() req: Request) {
    return this.appService.getTickets();
  }

  @Get('ticket/:id')
  getTicketById(@Param('id') id: string) {
    return this.appService.getTicketById(+id);
  }

  @Patch('ticket/:id')
  @UseGuards(AuthGuard, RoleGuard)
  updateTicket(@Param('id') id: string, @Body() data: UpdateTicketDto) {
    return this.appService.updateTicket(+id, data);
  }

  @Delete('ticket/:id')
  @UseGuards(AuthGuard, RoleGuard)
  deleteTicket(@Param('id') id: string) {
    return this.appService.deleteTicket(+id);
  }

  //===========================================================================
  //----Loyalty program--------------------------------------------------------
  @Get('loyalty')
  getLoyaltyMembers() {
    return this.appService.getMembers();
  }

  @Get('loyalty/:id')
  getLoyaltyMemberById(@Param('id') id: string) {
    return this.appService.getMemberById(+id);
  }

  @Post('loyalty')
  createLoyaltyMember(@Body() data: CreateLoyaltyProgramDto) {
    console.log(data)
    return this.appService.enrollMember(data);
  }

  @Patch('loyalty/:id')
  // @UseGuards(AuthGuard)
  updateMemberPoints(
    @Param('id') id: string,
    @Body() data: UpdateLoyaltyProgramDto,
  ) {
    return this.appService.updatePoints(+id, data);
  }

  @Delete('loyalty/:id')
  // @UseGuards(AuthGuard)
  deleteLoyaltyMember(@Param('id') id: string) {
    return this.appService.deleteMember(+id);
  }

  // ==================ONLY---DB---QUERIES=========================
  // ---- Airports ------------------------------------------------
  @Post('airport')
  @UseGuards(AuthGuard)
  createAirport(@Body() data: CreateAirportDto) {
    return this.appService.createAirport(data);
  }

  @Get('airport')
  getAirports() {
    return this.appService.getAirports();
  }

  @Get('airport/:id')
  getAirportById(@Param('id') id: string) {
    return this.appService.getAirportById(Number(id));
  }

  @Patch('airport/:id')
  @UseGuards(AuthGuard)
  updateAirport(@Param('id') id: string, @Body() data: UpdateAirportDto) {
    return this.appService.updateAirport(Number(id), data);
  }

  @Delete('airport/:id')
  @UseGuards(AuthGuard)
  deleteAirport(@Param('id') id: string) {
    return this.appService.deleteAirport(Number(id));
  }

  // ---- Cities ------------------------------------------------
  @Post('city')
  @UseGuards(AuthGuard)
  createCity(@Body() data: CreateCityDto) {
    return this.appService.createCity(data);
  }

  @Get('city')
  getCities() {
    return this.appService.getCities();
  }

  @Get('city/:id')
  getCityById(@Param('id') id: string) {
    return this.appService.getCityById(Number(id));
  }

  @Patch('city/:id')
  @UseGuards(AuthGuard)
  updateCity(@Param('id') id: string, @Body() data: UpdateCityDto) {
    return this.appService.updateCity(Number(id), data);
  }

  @Delete('city/:id')
  @UseGuards(AuthGuard)
  deleteCity(@Param('id') id: string) {
    return this.appService.deleteCity(Number(id));
  }

  // ---- Countries ------------------------------------------------
  @Post('country')
  @UseGuards(AuthGuard)
  createCountry(@Body() data: CreateCountryDto) {
    return this.appService.createCountry(data);
  }

  @Get('country')
  getCountries() {
    return this.appService.getCountries();
  }

  @Get('country/:id')
  getCountryById(@Param('id') id: string) {
    return this.appService.getCountryById(Number(id));
  }

  @Patch('country/:id')
  @UseGuards(AuthGuard)
  updateCountry(@Param('id') id: string, @Body() data: UpdateCountryDto) {
    return this.appService.updateCountry(Number(id), data);
  }

  @Delete('country/:id')
  @UseGuards(AuthGuard)
  deleteCountry(@Param('id') id: string) {
    return this.appService.deleteCountry(Number(id));
  }

  // ---- Companies ------------------------------------------------
  @Post('company')
  @UseGuards(AuthGuard)
  createCompany(@Body() data: CreateCompanyDto) {
    return this.appService.createCompany(data);
  }

  @Get('company')
  getCompanies() {
    return this.appService.getCompanies();
  }

  @Get('company/:id')
  getCompanyById(@Param('id') id: string) {
    return this.appService.getCompanyById(Number(id));
  }

  @Patch('company/:id')
  @UseGuards(AuthGuard)
  updateCompany(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    return this.appService.updateCompany(Number(id), data);
  }

  @Delete('company/:id')
  @UseGuards(AuthGuard)
  deleteCompany(@Param('id') id: string) {
    return this.appService.deleteCompany(Number(id));
  }

  // ---- Planes ------------------------------------------------
  @Post('planes')
  // @UseGuards(AuthGuard)
  createPlane(@Body() data: CreatePlaneDto) {
    return this.appService.createPlane(data);
  }

  @Get('planes')
  getPlanes() {
    return this.appService.getPlanes();
  }

  @Get('planes/:id')
  getPlaneById(@Param('id') id: string) {
    return this.appService.getPlaneById(Number(id));
  }

  @Patch('planes/:id')
  @UseGuards(AuthGuard)
  updatePlane(@Param('id') id: string, @Body() data: UpdatePlaneDto) {
    return this.appService.updatePlane(Number(id), data);
  }

  @Delete('planes/:id')
  @UseGuards(AuthGuard)
  deletePlane(@Param('id') id: string) {
    return this.appService.deletePlane(Number(id));
  }

  // ---- Classes ------------------------------------------------
  @Post('class')
  @UseGuards(AuthGuard)
  createClass(@Body() data: CreateClassDto) {
    return this.appService.createClass(data);
  }

  @Get('class')
  getClasses() {
    return this.appService.getClasses();
  }

  @Get('class/:id')
  getClassById(@Param('id') id: string) {
    return this.appService.getClassById(Number(id));
  }

  @Patch('class/:id')
  @UseGuards(AuthGuard)
  updateClass(@Param('id') id: string, @Body() data: UpdateClassDto) {
    return this.appService.updateClass(Number(id), data);
  }

  @Delete('class/:id')
  @UseGuards(AuthGuard)
  deleteClass(@Param('id') id: string) {
    return this.appService.deleteClass(Number(id));
  }

  // ---- Seats ------------------------------------------------
  @Post('seat')
  // @UseGuards(AuthGuard)
  createSeat(@Body() data: CreateSeatDto) {
    try {
      return this.appService.createSeat(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('seat')
  getSeats() {
    return this.appService.getSeats();
  }

  @Get('seat/:id')
  getSeatById(@Param('id') id: string) {
    return this.appService.getSeatById(Number(id));
  }

  @Patch('seat/:id')
  @UseGuards(AuthGuard)
  updateSeat(@Param('id') id: string, @Body() data: UpdateSeatDto) {
    return this.appService.updateSeat(Number(id), data);
  }

  @Delete('seat/:id')
  // @UseGuards(AuthGuard)
  deleteSeat(@Param('id') id: string) {
    return this.appService.deleteSeat(Number(id));
  }
}
